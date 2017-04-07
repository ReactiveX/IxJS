'use strict';
import { identity } from '../internal/identity';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

export class DistinctIterator<TSource, TKey> extends IteratorImpl<TSource> {
  private _q: Array<TSource | TKey>;

  constructor(
    private _it: Iterable<TSource>,
    private _fn: (value: TSource) => TKey = identity,
    private _cmp: (x: TKey, y: TKey) => boolean = ((x, y) => x === y)) {
    super();
    this._q = [];
  }

  protected *create() {
    for (let item of this._it) {
      let key = this._fn(item);
      if (arrayIndexOf(this._q, key, this._cmp) !== -1) {
        this._q.push(key);
        yield item;
      }
    }
  }
}

export class DistinctIterable<TSource, TKey> extends IterableImpl<TSource> {
  constructor(
    private _source: Iterable<TSource>,
    private _fn?: (value: TSource) => TKey,
    private _cmp?: (x: TKey, y: TKey) => boolean) {
    super();
  }

  [Symbol.iterator]() {
    return new DistinctIterator<TSource, TKey>(this._source, this._fn, this._cmp);
  }
}

export function distinct<TSource, TKey>(
  source: Iterable<TSource>,
  fn?: (value: TSource) => TKey,
  cmp?: (x: TKey, y: TKey) => boolean): Iterable<TSource> {
  return new DistinctIterable<TSource, TKey>(source, fn, cmp);
}