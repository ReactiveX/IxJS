'use strict';

import { AsyncIterableX } from '../asynciterable';
import { identity } from '../internal/identity';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

class DistinctAsyncIterable<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _comparer: (x: TKey, y: TKey) => boolean;

  constructor(
      source: AsyncIterable<TSource>,
      keySelector: (value: TSource) => TKey,
      comparer: (x: TKey, y: TKey) => boolean) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator]() {
    let set = [];

    for await (let item of this._source) {
      let key = this._keySelector(item);
      if (arrayIndexOf(set, key, this._comparer) === -1) {
        set.push(key);
        yield item;
      }
    }
  }
}

export function distinct<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    comparer: (x: TKey, y: TKey) => boolean = defaultComparer): AsyncIterableX<TSource> {
  return new DistinctAsyncIterable<TSource, TKey>(source, keySelector, comparer);
}