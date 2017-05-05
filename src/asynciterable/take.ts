'use strict';

export async function* take<TSource>(source: AsyncIterable<TSource>, count: number): AsyncIterable<TSource> {
  let i = count;
  for await (let item of source) {
    if (i-- === 0) { break; }
    yield item;
  }
}