'use strict';

import { AsyncIterableX } from '../asynciterable';

class FinalyAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _action: () => void;

  constructor(source: AsyncIterable<TSource>, action: () => void) {
    super();
    this._source = source;
    this._action = action;
  }

  async *[Symbol.asyncIterator]() {
    try {
      for await (let item of this._source) { yield item; }
    } finally {
      this._action();
    }
  }
}

export function _finally<TSource>(
    source: AsyncIterable<TSource>,
    action: () => void): AsyncIterableX<TSource> {
  return new FinalyAsyncIterable<TSource>(source, action);
}