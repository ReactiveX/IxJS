import { AsyncIterableX } from '../asynciterablex';
import { bindCallback } from '../../util/bindcallback';
import { OperatorAsyncFunction } from '../../interfaces';

const NEVER_PROMISE = new Promise(() => {
  /**/
});

type InnerResult<T> = { value: IteratorResult<T>; index: number; type: 'inner' };
type OuterResult<T> = { value: IteratorResult<AsyncIterable<T>>; index: number; type: 'outer' };

function isInnerResult<T>(x: any): x is InnerResult<T> {
  return x.type === 'inner';
}

function wrapInnerValuePromiseWithIndex<T>(promise: Promise<IteratorResult<T>>, index: number) {
  return promise.then(value => ({ value, index, type: 'inner' })) as Promise<InnerResult<T>>;
}

function wrapOuterValuePromiseWithIndex<T, R>(
  promise: Promise<IteratorResult<T>>,
  index: number,
  selector: (value: T) => AsyncIterable<R> | Promise<AsyncIterable<R>>
) {
  return promise.then(
    async ({ value, done }) =>
      ({
        index,
        type: 'outer',
        value: { value: await selector(value), done }
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
    const outerSources = _source[Symbol.asyncIterator]();
    const activeInners = [] as AsyncIterator<TResult>[];
    const queuedInners = [] as AsyncIterable<TResult>[];
    const pending = [] as Promise<OuterResult<TResult> | InnerResult<TResult>>[];

    pending[0] = wrapOuterValuePromiseWithIndex(outerSources.next(), 0, _selector);

    let outerDone = false,
      active = 0;

    do {
      const res = await Promise.race(pending);
      if (isInnerResult(res)) {
        const { value: next, index } = res;
        if (!next.done) {
          const itr = activeInners[index - 1];
          pending[index] = wrapInnerValuePromiseWithIndex(itr.next(), index);
          yield next.value;
        } else {
          const it = queuedInners.shift();
          if (!it) {
            --active;
            activeInners[index - 1] = <any>null;
            pending[index] = <Promise<InnerResult<TResult>>>NEVER_PROMISE;
          } else {
            const itr = (activeInners[index - 1] = it[Symbol.asyncIterator]());
            pending[index] = wrapInnerValuePromiseWithIndex(itr.next(), index);
          }
        }
      } else {
        const { value: next } = res;
        if (next.done) {
          outerDone = true;
          pending[0] = <Promise<OuterResult<TResult>>>NEVER_PROMISE;
        } else {
          const it = (<unknown>next.value) as AsyncIterable<TResult>;
          if (active >= _maxConcurrent) {
            queuedInners.push(it);
          } else {
            const itr = (activeInners[active++] = it[Symbol.asyncIterator]());
            pending[active] = wrapInnerValuePromiseWithIndex(itr.next(), active);
            pending[0] = wrapOuterValuePromiseWithIndex(outerSources.next(), 0, _selector);
          }
        }
      }
    } while (!outerDone && active > 0);
  }
}

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult> {
  return function flatMapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new FlatMapAsyncIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 1));
  };
}
