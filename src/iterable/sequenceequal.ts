/*
'use strict';

export function sequenceEqual<T>(
    source: Iterable<T>,
    other: Iterable<T>,
    cmp?: (first : T, second: T) => boolean): boolean {
  cmp || (cmp = (x, y) => x === y);
  const it1 = source[Symbol.iterator](), it2 = other[Symbol.iterator]();
  let next1: IteratorResult<T>, next2: IteratorResult<T>;
  while (!(next1 = it1.next()).done) {
    next2 = it2.next();
    if (!(!next2.done && cmp(next1.value, next2.value))) {
      return false;
    }
  }

  return next2.done;
}

*/