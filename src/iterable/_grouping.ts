'use strict';

import { IterableX } from '../iterable';

export class GroupedIterable<TKey, TValue> extends IterableX<TValue> {
  public readonly key: TKey;
  private _source: Iterable<TValue>;

  constructor(key: TKey, source: Iterable<TValue>) {
    super();
    this.key = key;
    this._source = source;
  }

  [Symbol.iterator]() {
    return this._source[Symbol.iterator]();
  }
}

export function createGrouping<TSource, TKey, TValue>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey,
    elementSelector: (value: TSource) => TValue): Map<TKey, TValue[]> {
  let map = new Map<TKey, TValue[]>();
  for (let item of source) {
    let key = keySelector(item);
    let grouping = map.get(key);
    if (!map.has(key)) {
      grouping = [];
      map.set(key, grouping);
    }
    grouping!.push(elementSelector(item));
  }

  return map;
}