'use strict';

import { IIterable } from '../iterable';

export function isEmpty<T>(source: IIterable<T>) {
  var it = source[Symbol.iterator](), next;
  while (!(next = it.next()).done) {
    return false;
  }
  return true;
}