'use strict';

import { identity } from '../internal/identity';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

export async function* distinct<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    cmp: (x: TKey, y: TKey) => boolean = defaultComparer): AsyncIterable<TSource> {
  let set = [];

  for await (let item of source) {
      let key = keySelector(item);
      if (arrayIndexOf(set, key, cmp) !== -1) {
        set.push(key);
        yield item;
      }
  }
}