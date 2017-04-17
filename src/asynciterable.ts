'use strict';

import { bindCallback } from './internal/bindcallback';

export abstract class AsyncIterableX<T> {
  abstract [Symbol.asyncIterator](): AsyncIterable<T>;

  async forEach(fn: (value: T, index: number) => void, thisArg?: any): Promise<void> {
    const fun = bindCallback(fn, thisArg, 2);
    let i = 0;
    for await (let item of this[Symbol.asyncIterator]()) {
      fun(item, i++);
    }
  }
}
