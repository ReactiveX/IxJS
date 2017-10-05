import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';
import { booleanAsyncPredicate } from '../internal/predicates';

class FilterAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>;
  private _predicate: booleanAsyncPredicate<TSource>;

  constructor(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    predicate: booleanAsyncPredicate<TSource>) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of <AsyncIterable<TSource>>(this._source)) {
      if (await this._predicate(item, i++)) {
        yield item;
      }
    }
  }
}

export function filter<TSource>(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    predicate: booleanAsyncPredicate<TSource>,
    thisArg?: any): AsyncIterableX<TSource> {
  return new FilterAsyncIterable<TSource>(source, bindCallback(predicate, thisArg, 2));
}
