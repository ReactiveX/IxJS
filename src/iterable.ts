'use strict';

import { bindCallback } from './internal/bindcallback';
import { IIterable, IIterator } from './iterable.interfaces';

export abstract class Iterable<T> implements IIterable<T> {
  abstract [Symbol.iterator](): IIterator<T>;

  forEach(fn: (value: T, index:number) => void, thisArg?: any): void {
    let i = 0, it = this[Symbol.iterator](), next, fun = bindCallback(fn, thisArg, 2);
    while (!(next = it.next()).done) {
      fun(next.value, i++);
    }
  }
}