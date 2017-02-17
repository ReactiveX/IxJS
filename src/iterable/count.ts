'use strict';

import { IIterable } from '../iterable.interfaces';

export function count<T>(
    source: IIterable<T>, 
    fn?: (value: T) => boolean): number {
  fn || (fn = () => true);
  let it = source[Symbol.iterator](), next, i = 0;
  while (!(next = it.next()).done) {
    if (fn(next.value)) { i++; }
  }
  return i;  
}