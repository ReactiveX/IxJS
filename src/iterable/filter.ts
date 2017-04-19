'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

export class FilterIterator<T> extends IteratorX<T> {
  private _fn: (value: T, index: number) => boolean;
  private _i: number;

  constructor(private _it: Iterable<T>, fn: (value: T, index: number) => boolean, thisArg?: any) {
    super();
    this._fn = bindCallback(fn, thisArg, 2);
    this._i = 0;
  }

  protected *create() {
    for (let item of this._it) {
      if (this._fn(item, this._i++)) {
        yield item;
      }
    }
  }
}

export class FilterIterable<T> extends IterableX<T> {

  constructor(private _source: Iterable<T>, private _fn: (value: T, index: number) => boolean, private _thisArg?: any) {
    super();
  }

  [Symbol.iterator]() {
    return new FilterIterator<T>(this._source, this._fn, this._thisArg);
  }

  private _innerPredicate(fn: (value: T, index: number) => boolean) {
    return (x: T, i: number) => {
      return this._fn(x, i) && fn.call(this, x, i);
    };
  }

  internalFilter(fn: (value: T, index: number) => boolean, thisArg?: any): Iterable<T> {
    return new FilterIterable<T>(this._source, this._innerPredicate(fn), thisArg);
  }
}

export function filter<T>(
      source: Iterable<T>,
      fn: (value: T, index: number) => boolean,
      thisArg?: any): Iterable<T> {
  return source instanceof FilterIterable ?
    <FilterIterable<T>>(source).internalFilter(fn, thisArg) :
    new FilterIterable<T>(source, fn, thisArg);
}