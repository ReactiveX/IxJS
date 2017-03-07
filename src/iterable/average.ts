'use strict';

import { IIterable } from '../iterable.interfaces';

export function average<T>(source: IIterable<T | number>, fn?:(value: T) => number) {
  const it = source[Symbol.iterator]();
  let count = 0, sum = 0, next;
  while (!(next = it.next()).done) {
    sum += fn ? fn(next.value) : next.value;
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}