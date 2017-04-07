'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

export class MapIterator<TSource, TResult> extends IteratorImpl<TResult> {
  private _it: Iterator<TSource>;
  private _fn: (value: TSource, index: number) => TResult;
  private _i: number;

  constructor(
      it: Iterator<TSource>,
      fn: (value: TSource, index: number) => TResult,
      thisArg?: any) {
    super();
    this._it = it;
    this._fn = bindCallback(fn, thisArg, 2);
    this._i = 0;
  }

  _next() {
    const next = this._it.next();
    if (next.done) { return { done: true, value: undefined}; }
    return { done: false, value: this._fn(next.value, this._i++) };
  }
}

export class MapIterable<TSource, TResult> extends IterableImpl<TResult> {
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
    return new MapIterator<TSource, TResult>(this._source[Symbol.iterator](), this._fn);
  }

  internalMap(fn: (value: TSource, index: number) => TResult, thisArg?: any) {
    return new MapIterable<TSource, TResult>(this._source, this._innerMap(fn), thisArg);
  }
}

export function map<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource, index: number) => TResult,
    thisArg?: any): IterableImpl<TResult> {
  return source instanceof MapIterable ?
    source.internalMap(fn, thisArg) :
    new MapIterable(source, fn, thisArg);
}