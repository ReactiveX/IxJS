'use strict';

export async function* defaultIfEmpty<T>(source: AsyncIterable<T>, defaultValue: T): AsyncIterable<T> {
  let state = 1;
  for await (let item of source) {
    state = 2;
    yield item;
  }
  if (state === 1) {
    yield defaultValue;
  }
}