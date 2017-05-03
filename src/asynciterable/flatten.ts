'use strict';

import { isAsyncIterable } from '../internal/isasynciterable';

export async function *flatten<T>(iterable: AsyncIterable<T>, depth: number = Infinity): AsyncIterable<T> {
  if (depth === 0) { return iterable; }
  for await (let item of iterable) {
    if (isAsyncIterable(item)) {
      yield *flatten(item, depth - 1);
    } else {
      yield item;
    }
  }
}