'use strict';

import { IIterable } from '../iterable.interfaces';

export function reduce<TSource, TAccumulate>(
    source: IIterable<TSource>, 
    fn: (acc: TAccumulate, x: TSource, index: number) => TAccumulate, 
    seed?: TAccumulate): TAccumulate {
  const hasSeed = arguments.length === 3;
  let i = 0, hasValue = false, acc, it = source[Symbol.iterator](), next;
  hasSeed && i++;
  while (!(next = it.next()).done) {
    if (hasValue || (hasValue = hasSeed)) {
      acc = fn(acc, next.value, i++);
    } else {
      acc = next.value;
      hasValue = true;
    }
  }

  return acc;
}