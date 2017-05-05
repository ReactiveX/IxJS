'use strict';

import { bindCallback } from '../internal/bindcallback';

export async function find<T>(
    source: AsyncIterable<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): Promise<T | undefined> {
  if (typeof fn !== 'function') { throw new TypeError(); }
  const f = bindCallback(fn, thisArg, 2);
  let i = 0;

  for await (let item of source) {
    if (f(item, i++)) {
      return item;
    }
  }
  return undefined;
}