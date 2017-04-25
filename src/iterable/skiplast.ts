'use strict';

export function* skipLast<TSource>(source: Iterable<TSource>, count: number): Iterable<TSource> {
  let q = [];
  for (let item of source) {
    q.push(item);
    if (q.length > count) {
      yield q.shift()!;
    }
  }
}