'use strict';

import { IIterable } from '../iterable.interfaces';

export function min<T>(
    source: IIterable<T | number>,
    fn?: (x: T) => number): number {
  const it = source[Symbol.iterator]();
  let next;
  if((next = it.next()).done) {
    throw new Error('Sequence contains no elements');
  }

  let value = next.value;
  while(!(next = it.next()).done) {
    let x = fn ? fn(next.value) : next.value;
    if (x < value) { value = x; }
  }

  return value;
}