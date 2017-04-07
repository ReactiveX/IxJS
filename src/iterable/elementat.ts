'use strict';



export function elementAt<T>(source: Iterable<T>, index: number) {
  const it = source[Symbol.iterator]();
  let next;
  while (!(next = it.next()).done) {
    if (index === 0) { return next.value; }
    index--;
  }
  return undefined;
}