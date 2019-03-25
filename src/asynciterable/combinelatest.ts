import { AsyncIterableX } from './asynciterablex';
import { identity, identityAsync } from '../internal/identity';

// tslint:disable-next-line:no-empty
const NEVER_PROMISE = new Promise(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then(value => ({ value, index })) as Promise<MergeResult<T>>;
}

export class CombineLatestAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _sources: AsyncIterable<TSource>[];
  private _fn: (values: any[]) => TResult | Promise<TResult>;

  constructor(
    sources: AsyncIterable<TSource>[],
    fn: (values: any[]) => TResult | Promise<TResult>
  ) {
    super();
    this._sources = sources;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    const fn = this._fn;
    const length = this._sources.length;
    const iterators = new Array<AsyncIterator<TSource>>(length);
    const nexts = new Array<Promise<MergeResult<IteratorResult<TSource>>>>(length);
    let hasValueAll = false;
    const values = new Array<TSource>(length);
    const hasValues = new Array<boolean>(length);
    let active = length;

    hasValues.fill(false);

    for (let i = 0; i < length; i++) {
      const iterator = this._sources[i][Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    while (active > 0) {
      const next = Promise.race(nexts);
      const { value: next$, index } = await next;
      if (next$.done) {
        nexts[index] = <Promise<MergeResult<IteratorResult<TSource>>>>NEVER_PROMISE;
        active--;
      } else {
        values[index] = next$.value;
        hasValues[index] = true;

        const iterator$ = iterators[index];
        nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);

        if (hasValueAll || (hasValueAll = hasValues.every(identity))) {
          yield await fn(values);
        }
      }
    }
  }
}

export function combineLatest<T, T2>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<[T, T2]>;
export function combineLatest<T, T2, T3>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<[T, T2, T3]>;
export function combineLatest<T, T2, T3, T4>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<[T, T2, T3, T4]>;
export function combineLatest<T, T2, T3, T4, T5>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<[T, T2, T3, T4, T5]>;
export function combineLatest<T, T2, T3, T4, T5, T6>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<[T, T2, T3, T4, T5, T6]>;

export function combineLatest<T, R>(
  project: (values: [T]) => R | Promise<R>,
  source: AsyncIterable<T>
): AsyncIterableX<R>;
export function combineLatest<T, T2, R>(
  project: (values: [T, T2]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<R>;
export function combineLatest<T, T2, T3, R>(
  project: (values: [T, T2, T3]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<R>;
export function combineLatest<T, T2, T3, T4, R>(
  project: (values: [T, T2, T3, T4]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<R>;
export function combineLatest<T, T2, T3, T4, T5, R>(
  project: (values: [T, T2, T3, T4, T5]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<R>;
export function combineLatest<T, T2, T3, T4, T5, T6, R>(
  project: (values: [T, T2, T3, T4, T5, T6]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<R>;

export function combineLatest<T>(...sources: AsyncIterable<T>[]): AsyncIterableX<T[]>;
export function combineLatest<T, R>(
  project: (values: T[]) => R | Promise<R>,
  ...sources: AsyncIterable<T>[]
): AsyncIterableX<R>;
/* tslint:enable:max-line-length */
export function combineLatest<T, R>(...sources: any[]): AsyncIterableX<R> {
  let fn = (sources.shift() || identityAsync) as (values: any[]) => R | Promise<R>;
  if (fn && typeof fn !== 'function') {
    sources.unshift(fn);
    fn = identityAsync;
  }
  return new CombineLatestAsyncIterable<T, R>(sources as AsyncIterable<T>[], fn);
}
