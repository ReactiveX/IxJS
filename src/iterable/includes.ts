'use strict';

function comparer(a: any, b: any) {
  return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
}

export function includes<T>(
    source: Iterable<T>,
    searchElement: T,
    fromIndex: number): boolean {
  let n = +fromIndex || 0, i = 0;
  if (Math.abs(n)) { n = 0; }
  for (let item of source) {
    if (n > i++ && comparer(item, searchElement)) { return true; }
  }
  return false;
}
