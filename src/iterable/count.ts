'use strict';

import { IIterable } from '../iterable';

export function count<T>(source: IIterable, fn) {
  fn || (fn = x => x);
  let it = source[Symbol.iterator](), next, i = 0;
  while (!(next = it.next()).done) {
    if (fn(next.value)) { i++; }
  }
  return i;  
}