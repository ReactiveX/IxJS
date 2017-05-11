'use strict';

export function reverse<T>(source: Iterable<T>): Iterable<T> {
  let results = [];
  for (let item of source) {
    results.unshift(item);
  }
  return results;
}