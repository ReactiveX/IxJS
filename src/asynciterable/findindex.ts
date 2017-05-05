'use strict';

import { bindCallback } from '../internal/bindcallback';

export async function findIndex<T>(
    source: AsyncIterable<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): Promise<number> {
  if (typeof fn !== 'function') { throw new TypeError(); }
  const f = bindCallback(fn, thisArg, 2);
  let i = 0;

  for await (let item of source) {
    if (f(item, i++)) {
      return i;
    }
  }
  return -1;
};