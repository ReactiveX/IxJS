import { AsyncIterableX } from '../asynciterable';

class TakeAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    let i = this._count;
    if (i > 0) {
      for await (let item of this._source) {
        yield item;
        if (--i === 0) { break; }
      }
    }
  }
}

export function take<TSource>(source: AsyncIterable<TSource>, count: number): AsyncIterableX<TSource> {
  return new TakeAsyncIterable<TSource>(source, count);
}
