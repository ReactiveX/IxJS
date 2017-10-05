import { AsyncIterableX } from '../asynciterable';
import { booleanAsyncPredicate } from '../internal/predicates';

class TakeWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: booleanAsyncPredicate<TSource>;

  constructor(
      source: AsyncIterable<TSource>,
      predicate: booleanAsyncPredicate<TSource>) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of this._source) {
      if (!(await this._predicate(item, i++))) { break; }
      yield item;
    }
  }
}

export function takeWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: booleanAsyncPredicate<TSource>): AsyncIterableX<TSource> {
  return new TakeWhileAsyncIterable<TSource>(source, predicate);
}
