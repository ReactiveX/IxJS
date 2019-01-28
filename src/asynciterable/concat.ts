import { AsyncIterableX } from './asynciterablex';

export class ConcatAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for (let outer of this._source) {
      for await (let item of outer) {
        yield item;
      }
    }
  }
}

export function _concatAll<TSource>(
  source: Iterable<AsyncIterable<TSource>>
): AsyncIterableX<TSource> {
  return new ConcatAsyncIterable<TSource>(source);
}

/* tslint:disable:max-line-length */
export function concat<T>(v1: AsyncIterable<T>): AsyncIterableX<T>;
export function concat<T, T2>(v1: AsyncIterable<T>, v2: AsyncIterable<T2>): AsyncIterableX<T | T2>;
export function concat<T, T2, T3>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): AsyncIterableX<T | T2 | T3>;
export function concat<T, T2, T3, T4>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): AsyncIterableX<T | T2 | T3 | T4>;
export function concat<T, T2, T3, T4, T5>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): AsyncIterable<T | T2 | T3 | T4 | T5>;
export function concat<T, T2, T3, T4, T5, T6>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): AsyncIterable<T | T2 | T3 | T4 | T5 | T6>;
/* tslint:enable:max-line-length */

export function concat<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new ConcatAsyncIterable<T>(args);
}
