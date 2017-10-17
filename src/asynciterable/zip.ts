import { AsyncIterableX } from '../asynciterable';
import { identityAsync } from '../internal/identity';
import { returnAsyncIterator } from '../internal/returniterator';

class ZipAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
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
    const sourcesLength = this._sources.length;
    const its = this._sources.map(x => x[Symbol.asyncIterator]());
    do {
      const values = new Array(sourcesLength);
      for (let i = -1; ++i < sourcesLength; ) {
        const result = await its[i].next();
        if (result.done) {
          await Promise.all(its.map(returnAsyncIterator));
          return;
        }
        values[i] = result.value;
      }
      yield await fn(values);
    } while (1);
  }
}

export function zip<T, T2>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<[T, T2]>;
export function zip<T, T2, T3>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<[T, T2, T3]>;
export function zip<T, T2, T3, T4>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<[T, T2, T3, T4]>;
export function zip<T, T2, T3, T4, T5>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<[T, T2, T3, T4, T5]>;
export function zip<T, T2, T3, T4, T5, T6>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<[T, T2, T3, T4, T5, T6]>;

export function zip<T, R>(
  project: (values: [T]) => R | Promise<R>,
  source: AsyncIterable<T>
): AsyncIterableX<R>;
export function zip<T, T2, R>(
  project: (values: [T, T2]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<R>;
export function zip<T, T2, T3, R>(
  project: (values: [T, T2, T3]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<R>;
export function zip<T, T2, T3, T4, R>(
  project: (values: [T, T2, T3, T4]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<R>;
export function zip<T, T2, T3, T4, T5, R>(
  project: (values: [T, T2, T3, T4, T5]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<R>;
export function zip<T, T2, T3, T4, T5, T6, R>(
  project: (values: [T, T2, T3, T4, T5, T6]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<R>;

export function zip<T>(...sources: AsyncIterable<T>[]): AsyncIterableX<T[]>;
export function zip<T, R>(
  project: (values: T[]) => R | Promise<R>,
  ...sources: AsyncIterable<T>[]
): AsyncIterableX<R>;
/* tslint:enable:max-line-length */
export function zip<T, R>(...sources: any[]): AsyncIterableX<R> {
  let fn = sources.shift() as (values: any[]) => R | Promise<R>;
  if (typeof fn !== 'function') {
    sources.push(fn);
    fn = identityAsync;
  }
  return new ZipAsyncIterable<T, R>(sources as AsyncIterable<T>[], fn);
}
