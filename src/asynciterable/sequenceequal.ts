import { comparerAsync } from '../internal/comparer';

export async function sequenceEqual<T>(
    source: AsyncIterable<T>,
    other: AsyncIterable<T>,
    comparer: (first: T, second: T) => boolean | Promise<boolean> = comparerAsync): Promise<boolean> {
  const it1 = source[Symbol.asyncIterator](), it2 = other[Symbol.asyncIterator]();
  let next1: IteratorResult<T>, next2: IteratorResult<T>;
  while (!(next1 = await it1.next()).done) {
    if (!(!(next2 = await it2.next()).done && await comparer(next1.value, next2.value))) {
      return false;
    }
  }

  return (await it2.next()).done;
}
