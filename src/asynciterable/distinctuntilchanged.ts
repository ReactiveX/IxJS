'use strict';

import { identity } from '../internal/identity';
import { comparer as defaultComparer } from '../internal/comparer';

export async function* distinctUntilChanged<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    comparer: (first: TKey | TSource, second: TKey | TSource) => boolean = defaultComparer):  AsyncIterable<TSource> {
  let currentKey = <TKey | TSource>{}, hasCurrentKey = false;
  for await (let item of source) {
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