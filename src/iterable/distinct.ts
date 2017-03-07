'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

export class DistinctIterator<TSource, TKey> extends Iterator<TSource> {
  private _it: IIterator<TSource>;
  private _fn: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;
  private _q: Array<TSource | TKey>;

  constructor(
      it: IIterator<TSource>, 
      fn?: (value: TSource) => TKey, 
      cmp?: (x: TKey, y: TKey) => boolean) {
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

export class DistinctIterable<TSource, TKey> extends Iterable<TSource> {
  private _source: IIterable<TSource>;
  private _fn: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;

  constructor(
      source: IIterable<TSource>, 
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
    source: IIterable<TSource>,
    fn?: (value: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => boolean): IIterable<TSource> {
  return new DistinctIterable<TSource, TKey>(source, fn, cmp);
}