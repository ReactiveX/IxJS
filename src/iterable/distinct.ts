'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { $iterator$ } from '../symbol';
import { doneIterator } from '../internal/doneiterator';
import { defaultComparer } from '../internal/defaultcomparer';

// TODO: Fix to O(1) solution instead of O(N)
function arrayIndexOf(array, item, comparer) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (comparer(item, array[i]) === 0) { return i; }
  }
  return -1;
}

class DistinctIterator<T> extends Iterator<T> {
  private _it: any;
  private _cmp: any;
  private _q: Array<T>;

  constructor(it, cmp) {
    super();
    this._it = it;
    this._cmp = cmp;
    this._q = [];
  }

  next() {
    while (1) {
      let next = this._it.next();
      if (next.done) { return doneIterator; }
      if (arrayIndexOf(this._q, next.value, this._cmp) !== -1) {
        this._q.push(next.value);
        return { done: false, value: next.value };
      }
    }    
  }
}

export class DistinctIterable<T> extends Iterable<T> {
  private _source: any;
  private _cmp: any;

  constructor(source, cmp) {
    super();
    this._source = source;
    this._cmp = cmp || defaultComparer;
  }

  [$iterator$]() {
    return new DistinctIterator(this._source[$iterator$](), this._cmp);
  }
}