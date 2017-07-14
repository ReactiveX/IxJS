import { of } from './of';
import { AsyncIterableX } from '../asynciterable';

class RepeatAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    if (this._count === -1) {
      while (1) {
        for await (let item of this._source) { yield item; }
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        for await (let item of this._source) { yield item; }
      }
    }
  }
}

export function repeat<TSource>(source: AsyncIterable<TSource>, count: number = -1): AsyncIterableX<TSource> {
  return new RepeatAsyncIterable<TSource>(source, count);
}

export function repeatStatic<TSource>(value: TSource, count: number = -1): AsyncIterableX<TSource> {
  return new RepeatAsyncIterable<TSource>(of(value), count);
}
