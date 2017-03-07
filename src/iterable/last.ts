'use strict';

import { IIterable } from '../iterable.interfaces';

export function last<T>(
    source: IIterable<T>,
    fn?: (value: T) => boolean): T {
  fn || (fn = () => true);
  const it = source[Symbol.iterator]();
  let next;
  while (!(next = it.next()).done) {
    let result = next.value;
    if (fn(result)) {
      while (!(next = it.next()).done) {
        let current = next.value;
        if (fn(current)) {
          result = current;
        }
      }

      return result;
    }
  }

  return undefined;
}