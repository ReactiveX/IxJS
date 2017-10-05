import { AsyncIterableX } from '../asynciterable';
import { booleanAsyncPredicate } from '../internal/predicates';

class SkipWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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
    let yielding = false, i = 0;
    for await (let element of this._source) {
      if (!yielding && !(await this._predicate(element, i++))) { yielding = true; }
      if (yielding) { yield element; }
    }
  }
}

export function skipWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: booleanAsyncPredicate<TSource>): AsyncIterableX<TSource> {
  return new SkipWhileAsyncIterable<TSource>(source, predicate);
}
