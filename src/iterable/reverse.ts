import { IterableX } from '../iterable';

class ReverseIterator<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    let results = [];
    for (let item of this._source) {
      results.unshift(item);
    }
    yield* results;
  }
}

export function reverse<TSource>(source: Iterable<TSource>): IterableX<TSource> {
  return new ReverseIterator<TSource>(source);
}
