'use strict';

import { identity } from '../internal/identity';
import { $iterator$ } from '../symbol';

export function count<T>(source: Iterable<T>, fn) {
  fn || (fn = identity);
  let it = source[$iterator$], next, i = 0;
  while (!(next = it.next()).done) {
    if (fn(next.value)) { i++; }
  }
  return i;  
}