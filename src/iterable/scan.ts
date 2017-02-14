'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';

class ScanIterator extends Iterator {
  private _it: IIterator;
  private _fn: (acc: any, x: any) => any;
  private _hs: boolean;
  private _v: any;

  constructor(it: IIterator, fn: (acc: any, x: any) => any, hasSeed: boolean, seed?: any) {
    super();
    this._it = it;
    this._fn = fn;
    this._hs = hasSeed;
    this._v = seed;
  }

  next() {
    let next;
    if (!this._hs) {
      next = this._it.next();
      if (next.done) { return doneIterator; }
      this._hs = true;
      this._v = next.value;
    }
    next = this._it.next();
    if (next.done) { return { done: true, value: next.value }; }
    this._v = this._fn(this._v, next.value);
    return { done: false, value: this._v };    
  }
}

export class ScanIterable extends Iterable {
  private _source: IIterable;
  private _fn: (acc: any, x:any) => any;
  private _hs: boolean;
  private _s: any;

  constructor(source: IIterable, fn: (acc: any, x:any) => any, hasSeed: boolean, seed?: any) {
    super();
    this._source = source;
    this._fn = fn;
    this._hs = hasSeed;
    this._s = seed;
  }

  [Symbol.iterator]() {
    return new ScanIterator(this._source[Symbol.iterator](), this._fn, this._hs, this._s);
  }
}

function scan(source: IIterable, fn: (acc: any, x:any) => any, seed?: any): IIterable {
  if (arguments.length === 3) {
    return new ScanIterable(source, fn, true, arguments[2]);
  } else if (arguments.length === 2) {
    return new ScanIterable(source, fn, false);
  } else {
    throw new Error('Invalid arguments');
  }
};
