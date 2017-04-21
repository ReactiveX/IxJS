'use strict';

export function isEmpty<T>(source: Iterable<T>): boolean {
  let it = source[Symbol.iterator](), next;
  while (!(next = it.next()).done) {
    return false;
  }
  return true;
}