'use strict';

import { IIterable } from '../iterable.interfaces';

export function single<T>(
    source: IIterable<T>,
    fn?: (value: T) => boolean): T {
  fn || (fn = () => true);
  const it = source[Symbol.iterator]();
  let next;
  while (!(next = it.next()).done) {
    let result = next.value;
    if (fn(result)) {
      while (!(next = it.next()).done) {
        if (fn(next.value)) {
          throw new Error('More than one element was found');
        }
      }

      return result;
    }
  }

  return undefined;
}