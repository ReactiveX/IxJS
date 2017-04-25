'use strict';

import { isIterable } from '../internal/isiterable';

export function *flatten<T>(iterable: Iterable<T>, depth: number = Infinity): Iterable<T> {
  if (depth === 0) { return iterable; }
  for (let item of iterable) {
    if (isIterable(item)) {
      yield *flatten(item, depth - 1);
    } else {
      yield item;
    }
  }
}