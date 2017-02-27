'use strict';

import { IIterable, IIteratorResult } from '../iterable.interfaces';

export function reduce<TSource, TAccumulate>(
    source: IIterable<TSource>, 
    fn: (acc: TAccumulate | TSource, x: TSource, index: number) => TAccumulate, 
    seed?: TAccumulate): TAccumulate | TSource {
  const hasSeed = arguments.length === 3, it = source[Symbol.iterator]();
  let i = 0, hasValue = false, acc: TAccumulate | TSource, next: IIteratorResult<TSource>;
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