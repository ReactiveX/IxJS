'use strict';

import { AsyncIterableX } from '../asynciterable';
import { isAsyncIterable } from '../internal/isasynciterable';

class FlattenAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _depth: number;

  constructor(source: AsyncIterable<TSource>, depth: number) {
    super();
    this._source = source;
    this._depth = depth;
  }

  private async *_flatten(source: AsyncIterable<TSource>, depth: number): AsyncIterable<TSource> {
    if (this._depth === 0) { yield* source; }
    for await (let item of this._source) {
      if (isAsyncIterable(item)) {
        yield* this._flatten(item, this._depth - 1);
      } else {
        yield item;
      }
    }
  }

  async *[Symbol.asyncIterator](): AsyncIterator<TSource> {
    return this._flatten(this._source, this._depth)[Symbol.asyncIterator]();
  }
}

export function flatten<T>(source: AsyncIterable<T>, depth: number = Infinity): AsyncIterableX<T> {
  return new FlattenAsyncIterable<T>(source, depth);
}