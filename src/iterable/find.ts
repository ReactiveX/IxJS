'use strict';

import { IIterable } from '../iterable';
import { bindCallback } from '../internal/bindcallback';

export function find<T>(source: IIterable<T>, fn: (value: T, index: number) => boolean, thisArg?: any): T {
  if (typeof fn !== 'function') { throw new TypeError(); }
  const f = bindCallback(fn, thisArg, 2);
  let i = 0, iterable = source[Symbol.iterator]();
  while (1) {
    let next = iterable.next();
    if (next.done) { return undefined; }
    if (f(next.value, i)) { return next.value; }
    i++;
  }
};