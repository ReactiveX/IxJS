'use strict';

export function* zip<T, TResult>(
    first: Iterable<T>,
    second: Iterable<T>,
    fn: (fst: T, snd: T) => TResult): Iterable<TResult> {
  const it1 = first[Symbol.iterator](), it2 = second[Symbol.iterator]();
  let next1, next2;
  while (!(next1 = it1.next()).done && (!(next2 = it2.next()).done)) {
    yield fn(next1.value, next2.value);
  }
}