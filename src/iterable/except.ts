'use strict';

import { arrayIndexOf } from '../internal/arrayindexof';

export function* except<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    cmp: (x: TSource, y: TSource) => boolean = (x, y) => x === y): Iterable<TSource> {
  let map = [];
  for (let firstItem of first) {
    map.push(firstItem);
  }

  for (let secondItem of second) {
    if (arrayIndexOf(map, secondItem, cmp) !== -1) {
      map.push(secondItem);
      yield secondItem;
    }
  }
}