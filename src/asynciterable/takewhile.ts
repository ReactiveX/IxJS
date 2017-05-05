'use strict';

export async function* takeWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): AsyncIterable<TSource> {
  let i = 0;
  for await (let item of source) {
    if (!predicate(item, i++)) { break; }
    yield item;
  }
}