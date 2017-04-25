'use strict';

export function* takeWhile<TSource>(
    source: Iterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): Iterable<TSource> {
  let i = 0;
  for (let item of source) {
    if (!predicate(item, i++)) { break; }
    yield item;
  }
}