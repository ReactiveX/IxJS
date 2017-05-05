'use strict';

export async function* skip<T>(
    source: AsyncIterable<T>,
    count: number): AsyncIterable<T> {
  let next, it = source[Symbol.asyncIterator]();
  for (let i = 0; i < count; i++) {
    next = await it.next();
    if (next.done) { return; }
  }

  while (!(next = await it.next()).done) {
    yield next.value;
  }
}