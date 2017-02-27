'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class FinallyIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _fn: () => void;
  private _called: boolean;

  constructor(it: IIterator<T>, fn: () => void) {
    super();
    this._it = it;
    this._fn = fn;
    this._called = false;
  }

  next() {
    let next;
    try {
      next = this._it.next();
    } catch(e) {
      next = this._it.next();
    }
    
    if (next.done && !this._called) {
      this._called = true;
      this._fn();
    }

    return next;
  }
}

export class FinallyIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _fn: () => void;

  constructor(source: IIterable<T>, fn: () => void) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new FinallyIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function _finally<T>(
    source: IIterable<T>,
    fn: () => void): Iterable<T> {
  return new FinallyIterable<T>(source, fn);
}