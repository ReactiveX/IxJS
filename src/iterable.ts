'use strict';

import { bindCallback } from './internal/bindcallback';
import { IIterator } from './iterator';

export interface IIterable<T> {
  [Symbol.iterator](): IIterator<T>;
}

export abstract class Iterable<T> implements IIterable<T> {
  abstract [Symbol.iterator](): IIterator<T>;

  forEach<T>(fn: (value: T, index:number) => void, thisArg?: any): void {
    let i = 0, it = this[Symbol.iterator](), next, fun = bindCallback(fn, thisArg, 2);
    while (!(next = it.next()).done) {
      fun(next.value, i++);
    }
  }
}