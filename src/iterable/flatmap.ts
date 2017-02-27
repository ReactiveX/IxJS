'use strict';

import { IIterable, IIterator, ICollectionLike, IIndexedCollectionLike } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

class FlatMapIterator<TSource, TCollection, TResult> extends Iterator<TResult> {
  private _it: IIterator<TSource>;
  private _innerIt: IIterator<TCollection>;
  private _fn: (value: TSource, index: number) => IIterable<TCollection>;
  private _resFn: (value: TSource, current: TCollection) => TResult;
  private _i: number;

  constructor(
      it: IIterator<TSource>, 
      fn: (value: TSource, index: number) => IIterator<TCollection>, 
      resFn?: (value: TSource, current: TCollection) => TResult) {
    super();
    this._it = it;
    this._innerIt = null;
    this._resFn = resFn;
    this._i = 0;
  }

  next() {
    let outerNext;
    while(1) {
      if (!this._innerIt) {
        outerNext = this._it.next();
        if (outerNext.done) { return { done: true, value: outerNext.value }; }

        let innerItem = this._fn(outerNext.value, this._i++);
        this._innerIt = innerItem[Symbol.iterator]();
      }

      let innerNext = this._innerIt.next();
      if (innerNext.done) {
        this._innerIt = null;
      } else {
        return { 
          done: false, 
          value: this._resFn ? this._resFn(outerNext.value, innerNext.value) : innerNext.value 
        };
      }
    }    
  }
}

export class FlatMapIterable<TSource, TCollection, TResult> extends Iterable<TResult> {
  private _source: IIterable<TSource>;
  private _fn: (value: TSource, index: number) => IIterator<TCollection>;
  private _resFn: (value: TSource, current: TCollection) => TResult;

  constructor(
      source: IIterable<TSource>, 
      fn: (value: TSource, index: number) => IIterator<TCollection>, 
      resFn?: (value: TSource, current: TCollection) => TResult) {
    super();
    this._source = source;
    this._fn = fn;
    this._resFn = resFn;
  }

  [Symbol.iterator]() {
    return new FlatMapIterator(this._source[Symbol.iterator](), this._fn, this._resFn);
  }
}

export function flatMap<TSource, TCollection, TResult>(
    source: IIterable<TSource>, 
    fn: (value: TSource, index: number) => IIterator<TCollection>, 
    resFn?: (value: TSource, current: TCollection) => TResult): Iterable<TResult> {
  return new FlatMapIterable(source, fn, resFn);
}