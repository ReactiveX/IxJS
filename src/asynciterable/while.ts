'use strict';

import { AsyncIterableX } from '../asynciterable';

class WhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _condition: () => boolean;
  private _source: AsyncIterable<TSource>;

  constructor(condition: () => boolean, source: AsyncIterable<TSource>) {
    super();
    this._condition = condition;
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    while (this._condition()) {
      yield* this._source;
    }
  }
}

export function _while<TSource>(condition: () => boolean, source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new WhileAsyncIterable<TSource>(condition, source);
}