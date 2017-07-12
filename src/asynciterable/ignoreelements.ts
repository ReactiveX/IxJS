import { AsyncIterableX } from '../asynciterable';

class IgnoreElementsAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<TSource> {
    // tslint:disable-next-line:no-empty
    for await (let _ of this._source) { }
  }
}

export function ignoreElements<TSource>(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new IgnoreElementsAsyncIterable<TSource>(source);
}
