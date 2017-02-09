'use strict';

import { Iterable, IIterable } from '../iterable';
import { from } from './from';
import { IIterator, Iterator } from '../iterator';
import { isIterable } from '../internal/isiterable';

class FlatMapIterator extends Iterator {
  private _it: IIterator;
  private _innerIt: IIterator;
  private _fn: (value: any, index: number) => any;
  private _resFn: (value: any, current: any) => any;
  private _i: number;

  constructor(it: IIterator, fn: (value: any, index: number) => any, resFn?: (value: any, current: any) => any) {
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

export class FlatMapIterable extends Iterable {
  private _source: IIterable;
  private _fn: (value: any, index: number) => any;
  private _resFn?: (value: any, current: any) => any;

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

export function flatMap(
    source: IIterable, 
    fn: (value: any, index: number) => any, 
    resFn?: (value: any, current: any) => any): IIterable {
  return new FlatMapIterable(source, fn, resFn);
}