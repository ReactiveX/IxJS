import { comparer as defaultComparer } from '../internal/comparer';

export function sequenceEqual<T>(
    source: Iterable<T>,
    other: Iterable<T>,
    comparer: (first: T, second: T) => boolean = defaultComparer): boolean {
  const it1 = source[Symbol.iterator](), it2 = other[Symbol.iterator]();
  let next1: IteratorResult<T>, next2: IteratorResult<T>;
  while (!(next1 = it1.next()).done) {
    if (!(!(next2 = it2.next()).done && comparer(next1.value, next2.value))) {
      return false;
    }
  }

  return it2.next().done;
}
