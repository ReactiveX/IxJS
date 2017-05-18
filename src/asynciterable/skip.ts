'use strict';

import { AsyncIterableX } from '../asynciterable';

class SkipAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator]() {
    let next, it = this._source[Symbol.asyncIterator]();
    for (let i = 0; i < this._count; i++) {
      next = await it.next();
      if (next.done) { return; }
    }

    while (!(next = await it.next()).done) {
      yield next.value;
    }
  }
}

export function skip<TSource>(source: AsyncIterable<TSource>, count: number): AsyncIterableX<TSource> {
  return new SkipAsyncIterable<TSource>(source, count);
}