import { AsyncIterableInput, AsyncIterableX } from '../asynciterablex.js';
import { wrapWithAbort } from '../operators/withabort.js';
import { AbortError, throwIfAborted } from '../../aborterror.js';
import { safeRace } from '../../util/safeRace.js';
import { isPromise } from '../../util/isiterable.js';
import { returnAsyncIterator } from '../../util/returniterator.js';

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

type Wrapper<TValue, TType extends Type> = { value: TValue; index: number; type: TType };

function ignoreInnerAbortErrors(signal: AbortSignal) {
  return function ignoreInnerAbortError(e?: any) {
    if (signal.aborted && e instanceof AbortError) {
      return NEVER_PROMISE;
    }
    throw e;
  };
}

async function* wrapIterator<TValue, TType extends Type>(
  source: AsyncIterable<TValue>,
  index: number,
  type: TType,
  signal?: AbortSignal
): AsyncGenerator<Wrapper<TValue, TType>> {
  throwIfAborted(signal);
  for await (const value of wrapWithAbort(source, signal)) {
    throwIfAborted(signal);
    yield { type, index, value };
  }
  return { type, index, value: undefined };
}

/** @ignore */
export class FlattenConcurrentAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  constructor(
    private _source: AsyncIterable<TSource>,
    private _selector: FlattenConcurrentSelector<TSource, TResult>,
    private _concurrent: number,
    private _switchMode: boolean,
    private _thisArg?: any
  ) {
    super();
    this._concurrent = this._switchMode ? 1 : Math.max(_concurrent, 1);
  }
  async *[Symbol.asyncIterator](outerSignal?: AbortSignal) {
    throwIfAborted(outerSignal);

    type OuterWrapper = Wrapper<TSource, Type.OUTER>;
    type InnerWrapper = Wrapper<TResult, Type.INNER>;

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

    const outer = wrapIterator(this._source, 0, Type.OUTER, outerSignal);
    const results = [outer.next()] as Promise<IteratorResult<OuterWrapper | InnerWrapper>>[];

    try {
      do {
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
                results[0] = outer.next();
              } else {
                // remove the outer iterator from the race, we're full
                results[0] = NEVER_PROMISE;
                outerValues.push(value as TSource);
              }
              break;
            }
            case Type.INNER: {
              yield value as TResult;
              const { [index - 1]: inner } = inners;
              const {
                [index - 1]: { signal },
              } = controllers;
              results[index] = inner.next().catch(ignoreInnerAbortErrors(signal));
              break;
            }
          }
        } else {
          // ignore this result slot
          results[index] = NEVER_PROMISE;
          switch (type) {
            case Type.OUTER: {
              outerComplete = true;
              break;
            }
            case Type.INNER: {
              --active;
              // add the outer iterator to the race
              results[0] = outer.next();
              // return the current slot to the pool
              innerIndices.push(index);
              // synchronously drain the `outerValues` buffer
              while (active < concurrent && outerValues.length) {
                // Don't use `await` so we avoid blocking while the number of active inner sequences is less than `concurrent`.
                pullNextOuter(outerValues.shift()!);
              }
              break;
            }
          }
        }
      } while (!outerComplete || active + outerValues.length > 0);
    } finally {
      controllers.forEach((controller) => controller?.abort());
      await Promise.all([outer as AsyncIterator<any>, ...inners].map(returnAsyncIterator));
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

      results[index] = wrapAndPullInner(index, innerSignal, inner).catch(
        ignoreInnerAbortErrors(innerSignal)
      );
    }

    function wrapAndPullInner(
      index: number,
      signal: AbortSignal,
      inner:
        | PromiseLike<AsyncIterableInput<TResult> | TResult>
        | AsyncIterableInput<TResult>
        | TResult
    ): Promise<IteratorResult<Wrapper<TResult, Type.INNER>>> {
      if (isPromise(inner)) {
        return inner.then((inner) => wrapAndPullInner(index, signal, inner)) as Promise<
          IteratorResult<Wrapper<TResult, Type.INNER>>
        >;
      }
      return (inners[index - 1] = wrapIterator(
        AsyncIterableX.as(inner),
        index,
        Type.INNER,
        signal
      )).next();
    }
  }
}
