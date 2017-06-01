'use strict';

import { IterableX } from '../iterable';
import { identity } from '../internal/identity';
import { createGrouping, GroupedIterable } from './_grouping';

export class GroupByIterable<TSource, TKey, TValue> extends IterableX<GroupedIterable<TKey, TValue>> {
  private _source: Iterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _elementSelector: (value: TSource) => TValue;

  constructor(
      source: Iterable<TSource>,
      keySelector: (value: TSource) => TKey,
      elementSelector: (value: TSource) => TValue) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._elementSelector = elementSelector;
  }

  *[Symbol.iterator]() {
    const map = createGrouping(this._source, this._keySelector, this._elementSelector);
    for (let [key, values] of map) {
      yield new GroupedIterable(key, values);
    }
  }
}

export function groupBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey): IterableX<GroupedIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  source: Iterable<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue): IterableX<GroupedIterable<TKey, TValue>>;
export function groupBy<TSource, TKey, TValue>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey,
    elementSelector: (value: TSource) => TValue = identity): IterableX<GroupedIterable<TKey, TValue>> {
  return new GroupByIterable<TSource, TKey, TValue>(source, keySelector, elementSelector);
}
