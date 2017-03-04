'use strict';

import { IIterable, IIterator, ICollectionLike, IIndexedCollectionLike } from '../iterable.interfaces';
import { IAsyncIterable, IAsyncIterator } from '../asynciterable.interfaces';
import { AsyncIterable } from '../asynciterable';
import { AsyncIterator } from '../asynciterator';
import { bindCallback } from '../internal/bindcallback';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';

export class AsyncFromIterator<TSource, TResult> extends AsyncIterator<TResult> {
  private _source: IIterable<TSource> | ICollectionLike | IIndexedCollectionLike;
  private _it: IIterator<TSource>;
  private _isIterable: boolean;
  private _fn?: (value: TSource, index: number) => TResult;
  private _i: number;

  constructor(
      source: IIterable<TSource> | ICollectionLike | IIndexedCollectionLike, 
      fn?: (value: TSource, index: number) => TResult,
      thisArg? :any) {
    super();
    const iterable = isIterable(source);
    this._source = source;
    this._isIterable = iterable;
    this._it = iterable ? source[Symbol.iterator]() : null;
    this._fn = bindCallback(fn, thisArg, 2);;
    this._i = 0;    
  }

  _next() {
    let value;
    if (this._isIterable) {
      const next = this._it.next();
      if (next.done) {
        return this._settle('return', undefined);
      }
      value = next.value;
      if (this._fn) {
        value = this._fn(value, this._i++);
      }
    } else {
      let length = toLength((<IIndexedCollectionLike>this._source).length);
      if (this._i >= length) {
        return this._settle('return', undefined);
      }
      value = this._source[this._i];
      if (this._fn) {
        value = this._fn(value, this._i);
      }
      this._i++;
    }
    this._settle('normal', value);
  }
}

export class AsyncFromIterable<TSource, TResult> extends AsyncIterable<TResult> {
  private _source: IIterable<TSource> | ICollectionLike | IIndexedCollectionLike;
  private _fn: (value: any, index: number) => any;
  private _thisArg: any;

  constructor(
      source: IIterable<TSource> | ICollectionLike | IIndexedCollectionLike, 
      fn?: (value: TSource, index: number) => TResult,
      thisArg? :any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  [Symbol.asyncIterator]() {
    return new AsyncFromIterator(this._source, this._fn, this._thisArg);
  }
}

export function from<TSource, TResult>(
    source: IIterable<TSource> | ICollectionLike | IIndexedCollectionLike, 
    fn?: (value: TSource, index: number) => TResult, 
    thisArg?: any): AsyncIterable<TResult> {
  return new AsyncFromIterable(source, fn, thisArg);
}