'use strict';

export async function* reverse<T>(source: AsyncIterable<T>): AsyncIterable<T> {
  let results = [];
  for await (let item of source) {
    results.unshift(item);
  }
  for (let result of results) { yield result; }
}