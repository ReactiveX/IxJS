'use strict';

import { IIterable } from '../iterable';

export function every(source: IIterable, comparer: (value: any, index: number) => boolean): boolean {
  let it = source[Symbol.iterator](), next, i = 0;
  while (!(next = it.next()).done) {
    if (!comparer(next, i++)) { return false; }
  }
  return true;
}