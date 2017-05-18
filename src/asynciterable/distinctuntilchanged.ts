'use strict';

import { AsyncIterableX } from '../asynciterable';
import { identity } from '../internal/identity';
import { comparer as defaultComparer } from '../internal/comparer';

class DistinctUntilChangedAsyncIterable<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _comparer: (x: TKey, y: TKey) => boolean;
  
  constructor(
      source: AsyncIterable<TSource>,
      keySelector: (value: TSource) => TKey,
      comparer: (first: TKey, second: TKey) => boolean) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator]() {
    let currentKey = <TKey>{}, hasCurrentKey = false;
    for await (let item of this._source) {
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
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    comparer: (first: TKey, second: TKey) => boolean = defaultComparer):  AsyncIterableX<TSource> {
  return new DistinctUntilChangedAsyncIterable<TSource, TKey>(source, keySelector, comparer);
}