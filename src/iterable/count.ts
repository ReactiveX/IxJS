'use strict';



export function count<T>(
    source: Iterable<T>,
    fn?: (value: T) => boolean): number {
  fn || (fn = () => true);
  let it = source[Symbol.iterator](), next, i = 0;
  while (!(next = it.next()).done) {
    if (fn(next.value)) { i++; }
  }
  return i;
}