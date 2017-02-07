'use strict';

import { Iterable, IIterable } from '../iterable';
import { from } from './from';
import { IIterator, Iterator } from '../iterator';
import { isIterable } from '../internal/isiterable';

class FlatMapIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _innerIt: IIterator<T>;
  private _fn: (value: T, index: number) => any;
  private _resFn: (value: T, current: any) => any;
  private _i: number;

  constructor(it: IIterator<T>, fn: (value: T, index: number) => any, resFn?: (value: T, current: any) => any) {
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
        !isIterable(innerItem) || (innerItem = from(innerItem));
        this._innerIt = innerItem[Symbol.iterator]();
      }

      let innerNext = this._innerIt.next();
      if (innerNext.done) {
        this._innerIt = null;
      } else {
        let current = innerNext.value;
        this._resFn && (current = this._resFn(outerNext.value, current));
        return { done: false, value: current };
      }
    }    
  }
}

export class FlatMapIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _fn: (value: T, index: number) => any;
  private _resFn: (value: T, current: any) => any;

  constructor(source, fn, resFn?) {
    super();
    this._source = source;
    this._fn = fn;
    this._resFn = resFn;
  }

  [Symbol.iterator]() {
    return new FlatMapIterator(this._source[Symbol.iterator](), this._fn, this._resFn);
  }
}

export function flatMap (source, fn, resFn) {
  return new FlatMapIterable(source, fn, resFn);
}
