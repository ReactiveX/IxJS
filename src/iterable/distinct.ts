'use strict';

import { identity } from '../internal/identity';
import { arrayIndexOf } from '../internal/arrayindexof';

export function* distinct<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    cmp: (x: TKey, y: TKey) => boolean = ((x, y) => x === y)): Iterable<TSource> {
  let set = [];

  for (let item of source) {
      let key = keySelector(item);
      if (arrayIndexOf(set, key, cmp) !== -1) {
        set.push(key);
        yield item;
      }
  }
}