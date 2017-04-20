'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

export class MapIterator<TSource, TResult> extends IteratorX<TResult> {
  private _fn: (value: TSource, index: number) => TResult;
  private _i: number;

  constructor(
      private _it: Iterable<TSource>,
      fn: (value: TSource, index: number) => TResult,
      thisArg?: any) {
    super();
    this._fn = bindCallback(fn, thisArg, 2);
    this._i = 0;
  }

  protected *create() {
    for (let item of this._it) {
      yield this._fn(item, this._i++);
    }
  }
}

export class MapIterable<TSource, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource, index: number) => TResult;
  private _thisArg: any;

  constructor(
      source: Iterable<TSource>,
      fn: (value: TSource, index: number) => TResult,
      thisArg?: any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  private _innerMap(fn: (value: TSource, index: number) => TResult) {
    const self = this;
    return function (this: any, x: any, i: any) { return fn.call(this, self._fn(x, i), i); };
  }

  [Symbol.iterator]() {
    return new MapIterator<TSource, TResult>(this._source, this._fn);
  }

  internalMap(fn: (value: TSource, index: number) => TResult, thisArg?: any) {
    return new MapIterable<TSource, TResult>(this._source, this._innerMap(fn), thisArg);
  }
}

export function map<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource, index: number) => TResult,
    thisArg?: any): IterableX<TResult> {
  return source instanceof MapIterable ?
    source.internalMap(fn, thisArg) :
    new MapIterable(source, fn, thisArg);
}