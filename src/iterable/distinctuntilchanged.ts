'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { defaultComparer } from '../internal/defaultcomparer';
import { identity } from '../internal/identity';

class DistinctUntilChangedIterator<T> extends Iterator<T> {
  private _it: any;
  private _fn: any;
  private _cmp: any;
  private _currentKey: T;
  private _hasCurrentKey: boolean;

  constructor(it, fn, cmp) {
    super();
    this._it = it;
    this._fn = fn;
    this._cmp = cmp;
    this._currentKey = null;
    this._hasCurrentKey = false;
  }

  next() {
    const next = this._it.next();
    if (next.done) { return next; }
    const key = this._fn(next.value);
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

export class DistinctUntilChangedIterable<T> extends Iterable<T> {
  private _source: any;
  private _fn: any;
  private _cmp: any;

  constructor(source, fn, cmp) {
    super();
    this._fn = fn || identity;
    this._cmp = cmp || defaultComparer;
  }

  [Symbol.iterator]() {
    return new DistinctUntilChangedIterator(this._source[Symbol.iterator](), this._fn, this._cmp);
  }
}