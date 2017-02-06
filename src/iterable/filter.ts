'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

class FilterIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
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

function innerPredicate<T>(fn: (value: T, index: number) => boolean, self: any) {
  return function(x, i) { return self._fn(x, i) && fn.call(this, x, i); };
}

export class FilterIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _fn: (value: T, index: number) => boolean;

  constructor(source: IIterable<T>, fn: (value: T, index: number) => boolean, thisArg?: any) {
    super();
    this._source = source;
    this._fn = bindCallback(fn, thisArg, 2);
  }

  [Symbol.iterator]() {
    return new FilterIterator<T>(this._source[Symbol.iterator](), this._fn);
  }

  internalFilter(fn: (value: T, index: number) => boolean, thisArg?: any): IIterable<T> {
    return new FilterIterable<T>(this._source, innerPredicate(fn, this), thisArg);
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