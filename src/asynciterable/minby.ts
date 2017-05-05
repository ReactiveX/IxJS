'use strict';

import { extremaBy, defaultCompare } from './_extremaby';

export function minBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: (x: TKey, y: TKey) => number = defaultCompare): AsyncIterable<TSource> {
  return extremaBy(source, keySelector, (key, minValue) => -comparer(key, minValue));
}