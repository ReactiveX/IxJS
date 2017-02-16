'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { bindCallback } from '../internal/bindcallback';

export class SkipWhileIterator extends Iterator {
  private _it: IIterator;
  private _fn: (value: any, index: number) => any;
  private _i: number;
  private _skipped: boolean;

  constructor(it: IIterator, fn: (value: any, index: number) => any) {
    super();
    this._it = it;
    this._fn = fn;
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

export class SkipWhileIterable extends Iterable {
  private _source: IIterable;
  private _fn: (value: any, index: number) => any;

  constructor(source: IIterable, fn: (value: any, index: number) => any, thisArg?: any) {
    super();
    this._source = source;
    this._fn = bindCallback(fn, thisArg, 2);
  }

  [Symbol.iterator]() {
    return new SkipWhileIterator(this._source[Symbol.iterator](), this._fn);
  }
}

export function skipWhile (source: IIterable, fn: (value: any, index: number) => any, thisArg?: any) {
  return new SkipWhileIterable(source, fn, thisArg);
}
