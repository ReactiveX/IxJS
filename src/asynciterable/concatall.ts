import { AsyncIterableX } from '../asynciterable';

export class ConcatAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<AsyncIterable<TSource>>;

  constructor(source: AsyncIterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for await (let outer of this._source) {
      for await (let item of outer) {
        yield item;
      }
    }
  }
}

export function concatAll<TSource>(
  source: AsyncIterable<AsyncIterable<TSource>>
): AsyncIterableX<TSource> {
  return new ConcatAllAsyncIterable<TSource>(source);
}
