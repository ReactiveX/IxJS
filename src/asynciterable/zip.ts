'use strict';

export async function* zip<T, TResult>(
    first: AsyncIterable<T>,
    second: AsyncIterable<T>,
    fn: (fst: T, snd: T) => TResult): AsyncIterable<TResult> {
  const it1 = first[Symbol.asyncIterator](), it2 = second[Symbol.asyncIterator]();
  let next1, next2;
  while (!(next1 = await it1.next()).done && (!(next2 = await it2.next()).done)) {
    yield fn(next1.value, next2.value);
  }
}