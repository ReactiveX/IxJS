'use strict';

import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

export async function* except<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean = defaultComparer): AsyncIterable<TSource> {
  let map = [];
  for await (let firstItem of first) {
    map.push(firstItem);
  }

  for await (let secondItem of second) {
    if (arrayIndexOf(map, secondItem, defaultComparer) !== -1) {
      map.push(secondItem);
      yield secondItem;
    }
  }
}