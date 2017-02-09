'use strict';

import { bindCallback } from './internal/bindcallback';
import { IIterator } from './iterator';

export interface IIterable {
  [Symbol.iterator](): IIterator;
}

export abstract class Iterable implements IIterable {
  abstract [Symbol.iterator](): IIterator;

  forEach(fn: (value: any, index:number) => void, thisArg?: any): void {
    let i = 0, it = this[Symbol.iterator](), next, fun = bindCallback(fn, thisArg, 2);
    while (!(next = it.next()).done) {
      fun(next.value, i++);
    }
  }
}