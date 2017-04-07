'use strict';


import { bindCallback } from '../internal/bindcallback';

export function find<T>(
    source: Iterable<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): T | undefined {
  if (typeof fn !== 'function') { throw new TypeError(); }
  const f = bindCallback(fn, thisArg, 2);
  let i = 0;
  for (let item of source) {
    if (f(item, i)) {
      return item;
    }
  }
  return undefined;
}