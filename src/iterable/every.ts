'use strict';

export function every<T>(
    source: Iterable<T>,
    comparer: (value: T, index: number) => boolean): boolean {
  let i = 0;
  for (let item of source) {
    if (!comparer(item, i++)) { return false; }
  }
  return true;
}