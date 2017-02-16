'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

// TODO: Fix to O(1) solution instead of O(N)
function arrayIndexOf(array, item, comparer) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (comparer(item, array[i]) === 0) { return i; }
  }
  return -1;
}

export class DistinctIterator<TSource, TKey> extends Iterator<TSource> {
  private _it: IIterator<TSource>;
  private _fn: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;
  private _q: Array<TSource>;

  constructor(it: IIterator<TSource>, fn?: (value: TSource) => TKey, cmp?: (x: TKey, y: TKey) => boolean) {
    super();
    this._it = it;
    this._fn = fn;
    this._cmp = cmp || ((x, y) => x === y);
    this._q = [];
  }

  next() {
    while (1) {
      let next = this._it.next();
      if (next.done) { return next; }
      let key = this._fn ? this._fn(next.value) : next.value;
      if (arrayIndexOf(this._q, key, this._cmp) !== -1) {
        this._q.push(key);
        return { done: false, value: next.value };
      }
    }    
  }
}

export class DistinctIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _cmp: (x: any, y: any) => boolean;

  constructor(source: IIterable<T>, cmp?: (x: T, y: T) => boolean) {
    super();
    this._source = source;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new DistinctIterator(this._source[Symbol.iterator](), this._cmp);
  }
}

export function distinct<TSource, TKey>(
    source: IIterable<TSource>,
    fn?: (value: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => boolean): IIterable<TSource> {
  return new DistinctIterable(source, cmp);
}