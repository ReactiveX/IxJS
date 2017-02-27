'use strict';

import { IIterable, IIteratorResult } from '../iterable.interfaces';

export function sum<T>(
  source: IIterable<T | number>,
  fn?: (value: T) => number): number {
  const it = source[Symbol.iterator]();
  let next, sum = 0;
  while (!(next = it.next()).done) {
    sum += fn ? fn(next.value) : next.value;
  }

  return sum;
}