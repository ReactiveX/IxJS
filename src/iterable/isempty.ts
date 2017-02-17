'use strict';

import { IIterable } from '../iterable.interfaces';

export function isEmpty<T>(source: IIterable<T>): boolean {
  let it = source[Symbol.iterator](), next;
  while (!(next = it.next()).done) {
    return false;
  }
  return true;
}