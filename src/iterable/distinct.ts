'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

export class DistinctIterator<TSource, TKey> extends IteratorImpl<TSource> {
  private _it: Iterator<TSource>;
  private _fn?: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;
  private _q: Array<TSource | TKey>;

  constructor(
      it: Iterator<TSource>,
      fn?: (value: TSource) => TKey,
      cmp?: (x: TKey, y: TKey) => boolean) {
    super();
    this._it = it;
    this._fn = fn;
    this._cmp = cmp || ((x, y) => x === y);
    this._q = [];
  }

  _next() {
    while (1) {
      let next = this._it.next();
      if (next.done) { break; }
      let key = this._fn ? this._fn(next.value) : next.value;
      if (arrayIndexOf(this._q, key, this._cmp) !== -1) {
        this._q.push(key);
        return { done: false, value: next.value };
      }
    }
    return { done: true, value: undefined };
  }
}

export class DistinctIterable<TSource, TKey> extends IterableImpl<TSource> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;

  constructor(
      source: Iterable<TSource>,
      fn?: (value: TSource) => TKey,
      cmp?: (x: TKey, y: TKey) => boolean) {
    super();
    this._source = source;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new DistinctIterator<TSource, TKey>(this._source[Symbol.iterator](), this._fn, this._cmp);
  }
}

export function distinct<TSource, TKey>(
    source: Iterable<TSource>,
    fn?: (value: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => boolean): Iterable<TSource> {
  return new DistinctIterable<TSource, TKey>(source, fn, cmp);
}