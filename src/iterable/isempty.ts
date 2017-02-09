'use strict';

import { IIterable } from '../iterable';

export function isEmpty<T>(source: IIterable): boolean {
  let it = source[Symbol.iterator](), next;
  while (!(next = it.next()).done) {
    return false;
  }
  return true;
}