'use strict';

export async function* skipWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): AsyncIterable<TSource> {
  let it = source[Symbol.asyncIterator](), i = 0, next;
  while (!(next = await it.next()).done) {
    if (!predicate(next.value, i++)) {
      yield next.value;
      while (!(next = await it.next()).done) {
        yield next.value;
      }
    }
  }
}