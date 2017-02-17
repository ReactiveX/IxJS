'use strict';

import { IIterable, IIterator, ICollectionLike, IIndexedCollectionLike } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { bindCallback } from '../internal/bindcallback';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';

const doneIterator = { done: true, value: undefined };

class FromIterator<TSource, TResult> extends Iterator<TResult> {
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

  next() {
    let value;
    if (this._isIterable) {
      let next = this._it.next();
      if (next.done) { return { done: true, value: next.value }; }
      value = next.value;
      if (this._fn) {
        value = this._fn(value, this._i++);
      }
      return { done: false, value: value };
    } else {
      let length = toLength((<IIndexedCollectionLike>this._source).length);
      if (this._i < length) {
        value = this._source[this._i];
        if (this._fn) {
          value = this._fn(value, this._i);
        }
        this._i++;
        return { done: false, value: value };
      }
      return doneIterator;
    }    
  }
}

export class FromIterable<TSource, TResult> extends Iterable<TResult> {
  private _source: IIterable<TSource>;
  private _fn: (value: any, index: number) => any;
  private _thisArg: any;

  constructor(
      source: IIterable<TSource>, 
      fn?: (value: TSource, index: number) => TResult,
      thisArg? :any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  [Symbol.iterator]() {
    return new FromIterator(this._source, this._fn, this._thisArg);
  }
}

export function from<TSource, TResult>(
    source: IIterable<TSource>, 
    fn?: (value: TSource, index: number) => TResult, 
    thisArg?: any): Iterable<TResult> {
  return new FromIterable(source, fn, thisArg);
}