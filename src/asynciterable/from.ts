'use strict';

import { AsyncIterableX } from '../asynciterable';
import { AsyncIteratorX } from '../asynciterator';
import { bindCallback } from '../internal/bindcallback';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';

export class AsyncFromIterator<TSource, TResult> extends AsyncIteratorX<TResult> {
  private _source: Iterable<TSource> | ArrayLike<TSource>;
  private _it: Iterator<TSource>;
  private _isIterable: boolean;
  private _fn?: (value: TSource, index: number) => TResult;
  private _i: number;

  constructor(
      source: Iterable<TSource> | ArrayLike<TSource>,
      fn?: (value: TSource, index: number) => TResult,
      thisArg?: any) {
    super();
    if (isIterable(source)) {
      this._isIterable = true;
      this._it = source[Symbol.iterator]();
    } else {
      this._isIterable = false;
    }
    this._fn = bindCallback(fn, thisArg, 2);;
    this._i = 0;
  }

  _next() {
    let value: TResult;
    if (this._isIterable) {
      const next = this._it.next();
      if (next.done) {
        return this._settle('return', undefined);
      }
      let v = next.value;
      if (this._fn) {
        value = this._fn(v, this._i++);
      } else {
        value = <any>v;
      }
    } else {
      let length = toLength((<ArrayLike<TSource>>this._source).length);
      if (this._i >= length) {
        return this._settle('return', undefined);
      }
      let v = (<ArrayLike<TSource>>this._source)[this._i];
      if (this._fn) {
        value = this._fn(v, this._i);
      } else {
        value = <any>v;
      }
      this._i++;
    }
    this._settle('normal', value);
  }
}

export class AsyncFromIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: Iterable<TSource> | Iterable<TSource> | ArrayLike<TSource>;
  private _fn?: (value: TSource, index: number) => TResult;
  private _thisArg: any;

  constructor(
      source: Iterable<TSource> | Iterable<TSource> | ArrayLike<TSource>,
      fn?: (value: TSource, index: number) => TResult,
      thisArg?: any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  [Symbol.asyncIterator]() {
    return new AsyncFromIterator<TSource, TResult>(this._source, this._fn, this._thisArg);
  }
}

export function from<TSource, TResult>(
    source: Iterable<TSource> | Iterable<TSource> | ArrayLike<TSource>,
    fn?: (value: TSource, index: number) => TResult,
    thisArg?: any): AsyncIterable<TResult> {
  return new AsyncFromIterable(source, fn, thisArg);
}