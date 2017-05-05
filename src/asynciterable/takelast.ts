'use strict';

export async function* takeLast<TSource>(source: AsyncIterable<TSource>, count: number): AsyncIterable<TSource> {
  let q = [];
  for await (let item of source) {
    if (q.length >= count) {
      q.shift();
    }
    q.push(item);
  }

  while (q.length > 0) {
    yield q.shift()!;
  }
}