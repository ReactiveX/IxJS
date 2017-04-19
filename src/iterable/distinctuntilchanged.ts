/*

'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class DistinctUntilChangedIterator<TSource, TKey> extends IteratorX<TSource> {
  private _it: Iterator<TSource>;
  private _fn?: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;
  private _currentKey: TKey | null;
  private _hasCurrentKey: boolean;

  constructor(it: Iterator<TSource>, fn?: (value: TSource) => TKey, cmp?: (x: TKey, y: TKey) => boolean) {
    super();
    this._it = it;
    this._fn = fn;
    this._cmp = cmp || (cmp = (x, y) => x === y);
    this._currentKey = null;
    this._hasCurrentKey = false;
  }

  _next() {
    const next = this._it.next();
    if (next.done) { return next; }
    const key = this._fn ? this._fn(next.value) : next.value;
    let cmpEquals = false;
    if (this._hasCurrentKey) {
      cmpEquals = this._cmp(this._currentKey!, key);
    }
    if (!this._hasCurrentKey || !cmpEquals) {
      this._currentKey = key;
      this._hasCurrentKey = true;
      return { done: false, value: next.value };
    }
  }
}

export class DistinctUntilChangedIterable<TSource, TKey> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;

  constructor(source: Iterable<TSource>, fn: (value: TSource) => TKey, cmp: (x: TKey, y: TKey) => boolean) {
    super();
    this._fn = fn;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new DistinctUntilChangedIterator<TSource, TKey>(this._source[Symbol.iterator](), this._fn, this._cmp);
  }
}

export function distinctUntilChanged<TSource, TKey>(
    source: Iterable<TSource>,
    fn?: (value: TSource) => TKey,
    cmp?: (x: any, y: any) => boolean): Iterable<TSource> {
  return new DistinctUntilChangedIterable<TSource, TKey>(source, fn, cmp);
}
*/