/*
'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class FinallyIterator<T> extends IteratorX<T> {
  private _it: Iterator<T>;
  private _fn: () => void;
  private _called: boolean;

  constructor(it: Iterator<T>, fn: () => void) {
    super();
    this._it = it;
    this._fn = fn;
    this._called = false;
  }

  _next() {
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

export class FinallyIterable<T> extends IterableX<T> {
  private _source: Iterable<T>;
  private _fn: () => void;

  constructor(source: Iterable<T>, fn: () => void) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new FinallyIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function _finally<T>(
    source: Iterable<T>,
    fn: () => void): Iterable<T> {
  return new FinallyIterable<T>(source, fn);
}
*/