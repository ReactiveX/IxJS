'use strict';

import { bindCallback } from './internal/bindcallback';

export interface IIterable<T> {
  [Symbol.iterator]();
}

export abstract class Iterable<T> implements IIterable<T> {
  abstract [Symbol.iterator]();

  forEach<T>(fn: (value: T, index:number) => void, thisArg?: any): void {
    let i = 0, it = this[$iterator$](), next, fun = bindCallback(fn, thisArg, 2);
    while (!(next = it.next()).done) {
      fun(next.value, i++);
    }
  }
}