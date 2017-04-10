'use strict';

import { bindCallback } from './internal/bindcallback';


export abstract class IterableImpl<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;

  forEach(fn: (value: T, index: number) => void, thisArg?: any): void {
    const fun = bindCallback(fn, thisArg, 2);
    for (let item of this) {
      fun(item);
    }
  }
}