'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

export class SkipWhileIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _fn: (value: T, index: number) => boolean;
  private _i: number;
  private _skipped: boolean;

  constructor(
      it: IIterator<T>, 
      fn: (value: T, index: number) => boolean, 
      thisArg?: any) {
    super();
    this._it = it;
    this._fn = bindCallback(fn, thisArg, 2);
    this._i = 0;
    this._skipped = false;
  }

  next() {
    let next;
    if (!this._skipped) {
      while(1) {
        next = this._it.next();
        if (next.done) { return next; }
        if (!this._fn(next.value, this._i++)) {
          return { done: false, value: next.value };
        }
      }
      this._skipped = true;
      next = this._it.next();
      if (next.done) { return next; }
      return { done: false, value: next.value };
    }    
  }
}

export class SkipWhileIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _fn: (value: T, index: number) => boolean;
  private _thisArg: any;

  constructor(
      source: IIterable<T>, 
      fn: (value: T, index: number) => boolean, 
      thisArg?: any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  [Symbol.iterator]() {
    return new SkipWhileIterator<T>(this._source[Symbol.iterator](), this._fn, this._thisArg);
  }
}

export function skipWhile<T>(
    source: IIterable<T>, 
    fn: (value: T, index: number) => boolean, 
    thisArg?: any): Iterable<T> {
  return new SkipWhileIterable(source, fn, thisArg);
}
