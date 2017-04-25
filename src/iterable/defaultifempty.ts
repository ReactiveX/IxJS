'use strict';

export function* defaultIfEmpty<T>(source: Iterable<T>, defaultValue: T): Iterable<T> {
  let state = 1;
  for (let item of source) {
    state = 2;
    yield item;
  }
  if (state === 1) {
    yield defaultValue;
  }
}