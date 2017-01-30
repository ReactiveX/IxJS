'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { $iterator$ } from '../symbol';
import { bindCallback } from '../internal/bindcallback';

class FilterIterator<T> extends Iterator<T> {
  private _it: any;
  private _fn: (value: T, index: number) => boolean;
  private _i: number;

  constructor(it, fn) {
    super();
    this._it = it;
    this._fn = fn;
    this._i = 0;
  }

  next() {
    let next;
    while (!(next = this._it.next()).done) {
      if (this._fn(next.value, this._i++)) {
        return { done: false, value: next.value };
      }
    }
    return next;
  }
}

function innerPredicate(fn, self) {
  return function(x, i) { return self._fn(x, i) && fn.call(this, x, i); };
}

export class FilterIterable<T> extends Iterable<T> {
  private _source: any;
  private _fn: (value: T, index: number) => boolean;

  constructor(source, fn: (value: T, index: number) => boolean, thisArg?: any) {
    super();
    this._source = source;
    this._fn = bindCallback(fn, thisArg, 2);
  }

  [$iterator$]() {
    return new FilterIterator(this._source[$iterator$](), this._fn);
  }

  internalFilter(fn, thisArg) {
    return new FilterIterable(this._source, innerPredicate(fn, this), thisArg);
  }
}

export function filter<T>(
      source : Iterable<T>, 
      fn: (value: T, index: number) => boolean, 
      thisArg?: any) {
  return source instanceof FilterIterable ?
    source.internalFilter(fn, thisArg) :
    new FilterIterable<T>(source, fn, thisArg);
}