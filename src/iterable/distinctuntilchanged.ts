'use strict';

import { IIterable, Iterable } from '../iterable';
import { IIterator, Iterator } from '../iterator';

class DistinctUntilChangedIterator extends Iterator {
  private _it: IIterator;
  private _fn: (value: any) => any;
  private _cmp: (x: any, y: any) => boolean;
  private _currentKey: any;
  private _hasCurrentKey: boolean;

  constructor(it: IIterator, fn: (value: any) => any, cmp: (x: any, y: any) => boolean) {
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

export class DistinctUntilChangedIterable extends Iterable {
  private _source: IIterable;
  private _fn: any;
  private _cmp: any;

  constructor(source: IIterable, fn: (value: any) => any, cmp: (x: any, y: any) => boolean) {
    super();
    this._fn = fn;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new DistinctUntilChangedIterator(this._source[Symbol.iterator](), this._fn, this._cmp);
  }
}

export function distinctUntilChanged(
    source: IIterable, 
    fn?: (value: any) => any, 
    cmp?: (x: any, y: any) => boolean): IIterable {
  fn || (fn = x => x);
  cmp || (cmp = (x, y) => x === y);
  return new DistinctUntilChangedIterable(source, fn, cmp);
}