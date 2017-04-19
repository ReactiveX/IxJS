/*
'use strict';



function some<T>(
    source: Iterable<T>,
    comparer: (value: T, index:number) => boolean): boolean {
  let it = source[Symbol.iterator](), next, i = 0;
  while (!(next = it.next()).done) {
    if (comparer(next, i++)) { return true; }
  }
  return false;
}
*/