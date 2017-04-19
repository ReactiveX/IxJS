/*

'use strict';

export function defaultCompare<T>(key: T, minValue: T): number {
  return key > minValue ? 1 : key < minValue ? -1 : 0;
}

export function extremaBy<TSource, TKey>(
    source: Iterable<TSource>,
    keyFn: (x: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => number): TSource[] {
  let result: TSource[] = [], next;
  const it = source[Symbol.iterator]();
  if((next = it.next()).done) {
    throw new Error('Sequence contains no elements');
  }

  let current = next.value, resKey = keyFn(current);
  while(!(next = it.next()).done) {
    let curr = next.value, key = keyFn(curr);
    const c = cmp(key, resKey);
    if (c === 0) {
      result.push(curr);
    } else if (c > 0) {
      result = [curr];
      resKey = key;
    }
  }

  return result;
}
*/