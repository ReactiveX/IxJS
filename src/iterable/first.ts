'use strict';

import { IIterable } from '../iterable.interfaces';

export function first<T>(
    source: IIterable<T>,
    fn?: (value: T) => boolean): T {
  fn || (fn = () => true);
  const it = source[Symbol.iterator]();
  let next;
  while (!(next = it.next()).done) {
    if (fn(next.value)) { return next.value; }
  }

  return undefined;
}