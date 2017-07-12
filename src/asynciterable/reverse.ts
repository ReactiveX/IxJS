import { AsyncIterableX } from '../asynciterable';

class ReverseAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let results = [];
    for await (let item of this._source) {
      results.unshift(item);
    }
    yield* results;
  }
}

export function reverse<TSource>(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new ReverseAsyncIterable<TSource>(source);
}
