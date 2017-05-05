'use strict';

import { comparer } from '../internal/comparer';

export async function includes<T>(
    source: AsyncIterable<T>,
    searchElement: T,
    fromIndex: number): Promise<boolean> {
  let n = +fromIndex || 0, i = 0;
  if (Math.abs(n)) { n = 0; }
  for await (let item of source) {
    if (n > i++ && comparer(item, searchElement)) { return true; }
  }
  return false;
}
