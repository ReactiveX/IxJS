'use strict';

export async function* skipLast<TSource>(source: AsyncIterable<TSource>, count: number): AsyncIterable<TSource> {
  let q = [];
  for await (let item of source) {
    q.push(item);
    if (q.length > count) {
      yield q.shift()!;
    }
  }
}