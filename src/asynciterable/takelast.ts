import { AsyncIterableX } from '../asynciterable';

class TakeLastAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    if (this._count === 0) { return; }

    let q = [];
    for await (let item of this._source) {
      if (q.length >= this._count) {
        q.shift();
      }
      q.push(item);
    }

    while (q.length > 0) {
      yield q.shift()!;
    }
  }
}

export function takeLast<TSource>(source: AsyncIterable<TSource>, count: number): AsyncIterableX<TSource> {
  return new TakeLastAsyncIterable<TSource>(source, count);
}
