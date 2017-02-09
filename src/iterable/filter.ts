'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

class FilterIterator extends Iterator {
  private _it: IIterator;
  private _fn: (value: any, index: number) => boolean;
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

function innerPredicate(fn: (value: any, index: number) => boolean, self: any) {
  return function(x, i) { return self._fn(x, i) && fn.call(this, x, i); };
}

export class FilterIterable extends Iterable {
  private _source: IIterable;
  private _fn: (value: any, index: number) => boolean;

  constructor(source: IIterable, fn: (value: any, index: number) => boolean, thisArg?: any) {
    super();
    this._source = source;
    this._fn = bindCallback(fn, thisArg, 2);
  }

  [Symbol.iterator]() {
    return new FilterIterator(this._source[Symbol.iterator](), this._fn);
  }

  internalFilter(fn: (value: any, index: number) => boolean, thisArg?: any): IIterable {
    return new FilterIterable(this._source, innerPredicate(fn, this), thisArg);
  }
}

export function filter(
      source : Iterable, 
      fn: (value: any, index: number) => boolean, 
      thisArg?: any): IIterable {
  return source instanceof FilterIterable ?
    source.internalFilter(fn, thisArg) :
    new FilterIterable(source, fn, thisArg);
}