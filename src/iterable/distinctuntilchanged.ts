'use strict';

import { IterableX } from '../iterable';
import { identity } from '../internal/identity';
import { comparer as defaultComparer } from '../internal/comparer';

class DistinctUntilChangedIterable<TSource, TKey> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _comparer: (x: TKey, y: TKey) => boolean;

  constructor(
      source: Iterable<TSource>,
      keySelector: (value: TSource) => TKey,
      comparer: (first: TKey, second: TKey) => boolean) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
  }

  *[Symbol.iterator]() {
    let currentKey = <TKey>{}, hasCurrentKey = false;
    for (let item of this._source) {
      let key = this._keySelector(item);
      let comparerEquals = false;
      if (hasCurrentKey) { comparerEquals = this._comparer(currentKey, key); }
      if (!hasCurrentKey || !comparerEquals) {
        hasCurrentKey = true;
        currentKey = key;
        yield item;
      }
    }    
  }
}

export function distinctUntilChanged<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    comparer: (first: TKey, second: TKey) => boolean = defaultComparer):  IterableX<TSource> {
  return new DistinctUntilChangedIterable<TSource, TKey>(source, keySelector, comparer);
}