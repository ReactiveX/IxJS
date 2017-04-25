'use strict';

import { identity } from '../internal/identity';

export function* distinctUntilChanged<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    comparer: (first: TKey | TSource | null, second: TKey | TSource | null) => boolean = (x, y) => x === y):  Iterable<TSource> {
  let currentKey = null, hasCurrentKey = false;
  for (let item of source) {
    let key = keySelector ? keySelector(item) : item;
    let comparerEquals = false;
    if (hasCurrentKey) { comparerEquals = comparer(currentKey, key); }
    if (!hasCurrentKey || !comparerEquals) {
      hasCurrentKey = true;
      currentKey = key;
      yield item;
    }
  }
}