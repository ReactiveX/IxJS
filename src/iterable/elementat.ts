'use strict';

import { IIterable } from '../iterable.interfaces';

export function elementAt<T>(source: IIterable<T>, index: number) {
  const it = source[Symbol.iterator]();
  let next;
  while (!(next = it.next()).done) {
    if (index === 0) { return next.value; }
    index--;
  }
  return undefined;
}