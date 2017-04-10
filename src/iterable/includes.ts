'use strict';



function comparer(a: any, b: any) {
  return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
}

export function includes<T>(
    source: Iterable<T>,
    searchElement: T,
    fromIndex: number): boolean {
  let n = +fromIndex || 0, i = 0, it = source[Symbol.iterator](), next;
  Math.abs(n) === Infinity && (n = 0);
  while (!(next = it.next()).done) {
    if (n > i++ && comparer(next.value, searchElement)) { return true; }
  }
  return false;
}
