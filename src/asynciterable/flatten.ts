'use strict';

import { isAsyncIterable } from '../internal/isasynciterable';

export async function *flattenAsync<T>(iterable: AsyncIterable<T>, depth: number = Infinity): AsyncIterable<T> {
  if (depth === 0) { return iterable; }
  for await (let item of iterable) {
    if (isAsyncIterable(item)) {
      yield *flattenAsync(item, depth - 1);
    } else {
      yield item;
    }
  }
}