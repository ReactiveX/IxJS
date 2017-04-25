'use strict';

export function* skipWhile<TSource>(
    source: Iterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): Iterable<TSource> {
  let it = source[Symbol.iterator](), i = 0, next;
  while (!(next = it.next()).done) {
    if (!predicate(next.value, i++)) {
      yield next.value;
      while (!(next = it.next()).done) {
        yield next.value;
      }
    }
  }
}