'use strict';

import { AsyncIterableX } from '../asynciterable';

class DeferAsyncIterabe<TSource> extends AsyncIterableX<TSource> {
  private _fn: () => AsyncIterable<TSource>;

  constructor(fn: () => AsyncIterable<TSource>) {
    super();
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    for await (let item of this._fn()) { yield item; }
  }
}

export function defer<TSource>(fn: () => AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new DeferAsyncIterabe<TSource>(fn);
}