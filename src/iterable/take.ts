'use strict';

export function* take<TSource>(source: Iterable<TSource>, count: number): Iterable<TSource> {
  let i = count;
  for (let item of source) {
    if (i-- === 0) { break; }
    yield item;
  }
}