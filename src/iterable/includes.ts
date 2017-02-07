'use strict';

import { IIterable } from '../iterable';

function comparer(a, b) {
  return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
}

export function includes<T>(source: IIterable<T>, searchElement: T, fromIndex: number): boolean {
  var n = +fromIndex || 0, i = 0, it = source[$iterator$](), next;
  Math.abs(n) === Infinity && (n = 0);
  while (!(next = it.next()).done) {
    if (n > i++ && comparer(next.value, searchElement)) { return true; }
  }
  return false;
}
