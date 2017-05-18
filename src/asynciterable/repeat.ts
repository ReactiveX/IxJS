'use strict';

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
        yield* this._source;
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        yield* this._source;
      }
    }
  }
}

export function repeat<TSource>(source: AsyncIterable<TSource>, count: number = -1): AsyncIterableX<TSource> {
  return new RepeatAsyncIterable<TSource>(source, count);
}