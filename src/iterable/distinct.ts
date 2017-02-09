'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { defaultComparer } from '../internal/defaultcomparer';

// TODO: Fix to O(1) solution instead of O(N)
function arrayIndexOf(array, item, comparer) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (comparer(item, array[i]) === 0) { return i; }
  }
  return -1;
}

class DistinctIterator extends Iterator {
  private _it: any;
  private _cmp: any;
  private _q: Array<any>;

  constructor(it, cmp) {
    super();
    this._it = it;
    this._cmp = cmp;
    this._q = [];
  }

  next() {
    while (1) {
      let next = this._it.next();
      if (next.done) { return next; }
      if (arrayIndexOf(this._q, next.value, this._cmp) !== -1) {
        this._q.push(next.value);
        return { done: false, value: next.value };
      }
    }    
  }
}

export class DistinctIterable extends Iterable {
  private _source: IIterable;
  private _cmp: (x: any, y: any) => boolean;

  constructor(source: IIterable, cmp: (x: any, y: any) => boolean) {
    super();
    this._source = source;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new DistinctIterator(this._source[Symbol.iterator](), this._cmp);
  }
}

export function distinct(source: IIterable, cmp?: (x: any, y: any) => boolean): IIterable {
  cmp || (cmp = defaultComparer);
  return new DistinctIterable(source, cmp);
}