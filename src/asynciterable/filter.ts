import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';

class FilterAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean | Promise<boolean>;

  constructor(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of <AsyncIterable<TSource>>this._source) {
      if (await this._predicate(item, i++)) {
        yield item;
      }
    }
  }
}

export function filter<T, S extends T>(
  source: Iterable<T | PromiseLike<T>> | AsyncIterable<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): AsyncIterableX<S>;
export function filter<T>(
  source: Iterable<T | PromiseLike<T>> | AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T>;
export function filter<TSource>(
  source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
  predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<TSource> {
  return new FilterAsyncIterable<TSource>(source, bindCallback(predicate, thisArg, 2));
}
