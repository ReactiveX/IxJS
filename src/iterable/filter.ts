'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

export class FilterIterator<T> extends IteratorImpl<T> {
  private _it: Iterator<T>;
  private _fn: (value: T, index: number) => boolean;
  private _i: number;

  constructor(it: Iterator<T>, fn: (value: T, index: number) => boolean, thisArg?: any) {
    super();
    this._it = it;
    this._fn = bindCallback(fn, thisArg, 2);
    this._i = 0;
  }

  _next() {
    let next;
    while (!(next = this._it.next()).done) {
      if (this._fn(next.value, this._i++)) {
        return { done: false, value: next.value };
      }
    }
    return next;
  }
}

export class FilterIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>;
  private _fn: (value: T, index: number) => boolean;
  private _thisArg: any;

  constructor(source: Iterable<T>, fn: (value: T, index: number) => boolean, thisArg?: any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  [Symbol.iterator]() {
    return new FilterIterator<T>(this._source[Symbol.iterator](), this._fn, this._thisArg);
  }

  private _innerPredicate(fn: (value: T, index: number) => boolean) {
    var self = this;
    return function(this: any, x: any, i: any) { return self._fn(x, i) && fn.call(this, x, i); };
  }

  internalFilter(fn: (value: T, index: number) => boolean, thisArg?: any): Iterable<T> {
    return new FilterIterable<T>(this._source, this._innerPredicate(fn), thisArg);
  }
}

export function filter<T>(
      source : Iterable<T>,
      fn: (value: T, index: number) => boolean,
      thisArg?: any): Iterable<T> {
  return source instanceof FilterIterable ?
    <FilterIterable<T>>(source).internalFilter(fn, thisArg) :
    new FilterIterable<T>(source, fn, thisArg);
}