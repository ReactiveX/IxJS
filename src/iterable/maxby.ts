
'use strict';

import { extremaBy, defaultCompare } from './_extremaby';

export function maxBy<TSource, TKey>(
    source: Iterable<TSource>,
    keyFn: (x: TSource) => TKey,
    cmp: (x: TKey, y: TKey) => number = defaultCompare): Iterable<TSource> {
  return extremaBy(source, keyFn, cmp);
}