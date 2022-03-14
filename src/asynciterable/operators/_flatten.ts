import { AsyncIterableInput, AsyncIterableX } from '../asynciterablex';
import { wrapWithAbort } from '../operators/withabort';
import { AbortError, throwIfAborted } from '../../aborterror';
import { safeRace } from '../../util/safeRace';
import { isPromise } from '../../util/isiterable';
import { as as asAsyncIterable } from '../as';

export type FlattenConcurrentSelector<TSource, TResult> = (
  value: TSource,
  index: number,
  signal?: AbortSignal
) => Promise<AsyncIterableInput<TResult>> | AsyncIterableInput<TResult>;

const NEVER_PROMISE = new Promise<IteratorResult<never>>(() => {});

const enum Type {
  OUTER = 0,
  INNER = 1,
}

function ignoreInnerAbortErrors(signal: AbortSignal) {
  return function ignoreInnerAbortError(e?: any) {
    if (signal.aborted && e instanceof AbortError) {
      return NEVER_PROMISE;
    }
    throw e;
  };
}

async function* wrapIterator<T>(
  source: AsyncIterable<T>,
  index: number,
  type: Type,
  signal?: AbortSignal
) {
  for await (const value of wrapWithAbort(source, signal)) {
    throwIfAborted(signal);
    yield { type, index, value };
  }
  return { type, index, value: undefined };
}

export class FlattenConcurrentAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  constructor(
    private _source: AsyncIterable<TSource>,
    private _selector: FlattenConcurrentSelector<TSource, TResult>,
    private _concurrent: number,
    private _switchMode: boolean,
    private _thisArg?: any
  ) {
    super();
    this._concurrent = this._switchMode ? 1 : Math.max(_concurrent, 0);
  }
  async *[Symbol.asyncIterator](outerSignal?: AbortSignal) {
    throwIfAborted(outerSignal);

    type OuterWrapper = { value: TSource; index: number; type: Type.OUTER };
    type InnerWrapper = { value: TResult; index: number; type: Type.INNER };

    let active = 0;
    let outerIndex = 0;
    let outerComplete = false;

    const thisArg = this._thisArg;
    const selector = this._selector;
    const switchMode = this._switchMode;
    const concurrent = this._concurrent;

    const outerValues = new Array<TSource>(0);
    const innerIndices = new Array<number>(0);
    const controllers = new Array<AbortController>(isFinite(concurrent) ? concurrent : 0);
    const inners = new Array<AsyncGenerator<InnerWrapper>>(isFinite(concurrent) ? concurrent : 0);

    const outer = wrapIterator(this._source, 0, Type.OUTER, outerSignal) as AsyncGenerator<
      OuterWrapper
    >;
    const results = [outer.next()] as Promise<IteratorResult<OuterWrapper | InnerWrapper>>[];

    try {
      while (1) {
        const {
          done = false,
          value: { type, value, index },
        } = await safeRace(results);

        if (!done) {
          switch (type) {
            case Type.OUTER: {
              if (switchMode) {
                active = 0;
              }
              if (active < concurrent) {
                pullNextOuter(value as TSource);
              } else {
                outerValues.push(value as TSource);
              }
              results[0] = outer.next();
              break;
            }
            case Type.INNER: {
              yield value as TResult;
              results[index] = pullNextInner(index);
              break;
            }
          }
        } else {
          // ignore this result slot
          results[index] = NEVER_PROMISE;
          switch (type) {
            case Type.OUTER:
              outerComplete = true;
              break;
            case Type.INNER:
              --active;
              // return the current slot to the pool
              innerIndices.push(index);
              // synchronously drain the `outerValues` buffer
              while (active < concurrent && outerValues.length) {
                // Don't use `await` so we avoid blocking while the number of active inner sequences is less than `concurrent`.
                pullNextOuter(outerValues.shift()!);
              }
              break;
          }
          if (outerComplete && active + outerValues.length === 0) {
            return;
          }
        }
      }
    } finally {
      controllers.forEach((controller) => {
        controller?.abort();
      });
    }

    function pullNextInner(index: number) {
      const result = inners[index - 1].next();
      const { [index - 1]: controller } = controllers;
      return result.catch(ignoreInnerAbortErrors(controller.signal));
    }

    function pullNextOuter(outerValue: TSource) {
      ++active;

      const index = innerIndices.pop() || active;

      // abort the current inner iterator first
      if (switchMode && controllers[index - 1]) {
        controllers[index - 1].abort();
      }

      controllers[index - 1] = new AbortController();
      const innerSignal = controllers[index - 1].signal;

      // Get the next inner sequence.
      // `selector` is a sync or async function that returns AsyncIterableInput.
      const inner = selector.call(thisArg, outerValue, outerIndex++, innerSignal);

      const wrapAndPullInner = (inner: AsyncIterableInput<TResult> | TResult) => {
        inners[index - 1] = wrapIterator(
          asAsyncIterable(inner),
          index,
          Type.INNER,
          innerSignal
        ) as AsyncGenerator<InnerWrapper>;
        return pullNextInner(index);
      };

      results[index] = isPromise(inner)
        ? (inner.then(wrapAndPullInner) as Promise<IteratorResult<InnerWrapper, any>>)
        : wrapAndPullInner(inner);
    }
  }
}
