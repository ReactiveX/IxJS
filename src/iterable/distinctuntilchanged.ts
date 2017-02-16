'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class DistinctUntilChangedIterator<TSource, TKey> extends Iterator<TSource> {
  private _it: IIterator<TSource>;
  private _fn: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;
  private _currentKey: TKey;
  private _hasCurrentKey: boolean;

  constructor(it: IIterator<TSource>, fn?: (value: TSource) => TKey, cmp?: (x: TKey, y: TKey) => boolean) {
    super();
    this._it = it;
    this._fn = fn;
    this._cmp = cmp || (cmp = (x, y) => x === y);
    this._currentKey = null;
    this._hasCurrentKey = false;
  }

  next() {
    const next = this._it.next();
    if (next.done) { return next; }
    const key = this._fn ? this._fn(next.value) : next.value;
    let cmpEquals = false;
    if (this._hasCurrentKey) {
      cmpEquals = this._cmp(this._currentKey, key);
    }
    if (!this._hasCurrentKey || !cmpEquals) {
      this._currentKey = key;
      this._hasCurrentKey = true;
      return { done: false, value: next.value };
    }    
  }
}

export class DistinctUntilChangedIterable<TSource, TKey> extends Iterable<TSource> {
  private _source: IIterable<TSource>;
  private _fn: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;

  constructor(source: IIterable<TSource>, fn: (value: TSource) => TKey, cmp: (x: TKey, y: TKey) => boolean) {
    super();
    this._fn = fn;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new DistinctUntilChangedIterator(this._source[Symbol.iterator](), this._fn, this._cmp);
  }
}

export function distinctUntilChanged<TSource, TKey>(
    source: IIterable<TSource>, 
    fn?: (value: TSource) => TKey, 
    cmp?: (x: any, y: any) => boolean): IIterable<TSource> {
  return new DistinctUntilChangedIterable(source, fn, cmp);
}