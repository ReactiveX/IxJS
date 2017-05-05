'use strict';

import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

export function* except<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean = defaultComparer): Iterable<TSource> {
  let map = [];
  for (let firstItem of first) {
    map.push(firstItem);
  }

  for (let secondItem of second) {
    if (arrayIndexOf(map, secondItem, comparer) !== -1) {
      map.push(secondItem);
      yield secondItem;
    }
  }
}