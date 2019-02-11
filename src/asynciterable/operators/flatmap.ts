import { AsyncIterableX } from '../asynciterablex';
import { bindCallback } from '../../util/bindcallback';
import { OperatorAsyncFunction } from '../../interfaces';

const NEVER_PROMISE = new Promise(() => {
  /**/
});

type InnerResult<T> = { value: T; done: boolean; index: number; type: 'inner' };
type OuterResult<T> = { value: AsyncIterable<T>; done: boolean; index: number; type: 'outer' };

function isOuterResult<T>(x: any): x is OuterResult<T> {
  return x.type === 'outer';
}

function wrapInnerValuePromiseWithIndex<T>(promise: Promise<IteratorResult<T>>, index: number) {
  return promise.then(({ value, done }) => ({ value, done, index, type: 'inner' })) as Promise<
    InnerResult<T>
  >;
}

function wrapOuterValuePromiseWithIndex<T, R>(
  promise: Promise<IteratorResult<T>>,
  index: number,
  selector: (value: T) => AsyncIterable<R> | Promise<AsyncIterable<R>>
) {
  return promise.then(
    async ({ value, done }) =>
      ({
        done,
        index,
        type: 'outer',
        value: !done ? await selector(value) : null
      } as OuterResult<R>)
  );
}

export class FlatMapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _maxConcurrent: number;
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
    maxConcurrent = Infinity
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._maxConcurrent = maxConcurrent;
  }

  async *[Symbol.asyncIterator]() {
    const { _maxConcurrent, _source, _selector } = this;
    const outer = _source[Symbol.asyncIterator]();
    const inners = [] as AsyncIterator<TResult>[];
    const queued = [] as AsyncIterable<TResult>[];
    const promises = [] as Promise<OuterResult<TResult> | InnerResult<TResult>>[];

    promises[0] = wrapOuterValuePromiseWithIndex(outer.next(), 0, _selector);

    let active = 0;
    let outerDone = false;
    try {
      do {
        const res = await Promise.race(promises);
        if (isOuterResult<TResult>(res)) {
          const { done, value } = res as OuterResult<TResult>;
          if ((outerDone = done)) {
            promises[0] = <Promise<OuterResult<TResult>>>NEVER_PROMISE;
          } else {
            const itr = (inners[active++] = value[Symbol.asyncIterator]());
            promises[active] = wrapInnerValuePromiseWithIndex(itr.next(), active);
            if (active >= _maxConcurrent) {
              queued.push(value);
              promises[0] = <Promise<OuterResult<TResult>>>NEVER_PROMISE;
            } else {
              promises[0] = wrapOuterValuePromiseWithIndex(outer.next(), 0, _selector);
            }
          }
        } else {
          const { done, value, index } = res as InnerResult<TResult>;
          if (!done) {
            const itr = inners[index - 1];
            promises[index] = wrapInnerValuePromiseWithIndex(itr.next(), index);
            yield value;
          } else if (queued.length > 0) {
            const it = queued.shift()!;
            const itr = (inners[index - 1] = it[Symbol.asyncIterator]());
            promises[index] = wrapInnerValuePromiseWithIndex(itr.next(), index);
          } else {
            --active;
            inners[index - 1] = <any>null;
            promises[index] = <Promise<InnerResult<TResult>>>NEVER_PROMISE;
            if (!outerDone) {
              promises[0] = wrapOuterValuePromiseWithIndex(outer.next(), 0, _selector);
            }
          }
        }
      } while (!outerDone || active > 0);
    } catch (e) {
      throw e;
    } finally {
      try {
        await Promise.all<any>(
          [outer, ...inners].map(it => it && typeof it.return === 'function' && it.return())
        );
      } catch (e) {
        /* ignored */
      }
    }
  }
}

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult>;

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  maxConcurrent: number,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult>;

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  maxConcurrent?: number,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult> {
  if (arguments.length === 2 && typeof maxConcurrent !== 'number') {
    thisArg = maxConcurrent;
    maxConcurrent = undefined;
  }
  return function flatMapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new FlatMapAsyncIterable<TSource, TResult>(
      source,
      bindCallback(selector, thisArg, 1),
      maxConcurrent
    );
  };
}
