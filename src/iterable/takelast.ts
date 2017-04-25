'use strict';

export function* takeLast<TSource>(source: Iterable<TSource>, count: number): Iterable<TSource> {
  let q = [];
  for (let item of source) {
    if (q.length >= count) {
      q.shift();
    }
    q.push(item);
  }

  while (q.length > 0) {
    yield q.shift()!;
  }
}