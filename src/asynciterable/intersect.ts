'use strict';

import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

function arrayRemove<T>(array: T[], item: T, comparer: (x: T, y: T) => boolean): boolean {
  let idx = arrayIndexOf(array, item, comparer);
  if (idx === -1) { return false; }
  array.splice(idx, 1);
  return true;
}

export async function* intersect<T>(
      first: AsyncIterable<T>,
      second: AsyncIterable<T>,
      comparer: (x: T, y: T) => boolean = defaultComparer): AsyncIterable<T> {
  let map = [];
  for await (let firstItem of first) {
    map.push(firstItem);
  }

  for await (let secondItem of second) {
    if (arrayRemove(map, secondItem, comparer)) {
      yield secondItem;
    }
  }
}