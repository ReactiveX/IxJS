'use strict';

import { bindCallback } from './internal/bindcallback';

export class AsyncIterableX<T> implements AsyncIterable<T> {
  private _source: AsyncIterable<T>;

  constructor(source: AsyncIterable<T>) {
    this._source = source;
  }

  [Symbol.asyncIterator]() {
    return this._source[Symbol.asyncIterator]();
  }

  async forEach(fn: (value: T, index: number) => void, thisArg?: any): Promise<void> {
    const fun = bindCallback(fn, thisArg, 2);
    let i = 0;
    for await (let item of this) {
      fun(item, i++);
    }
  }
}
