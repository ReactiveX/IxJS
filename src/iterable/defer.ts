'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class DeferIterator<T> extends IteratorImpl<T> {
  private _fn: () => Iterable<T>;
  private _it: Iterator<T> | null;

  constructor(fn: () => Iterable<T>) {
    super();
    this._fn = fn;
    this._it = null;
  }

  _next() {
    if (!this._it) {
      this._it = this._fn()[Symbol.iterator]();
    }
    return this._it.next();
  }
}

export class DeferIterable<T> extends IterableImpl<T> {
  private _fn: () => Iterable<T>;

  constructor(fn: () => Iterable<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new DeferIterator(this._fn);
  }
}

export function defer<T>(fn: () => Iterable<T>): Iterable<T> {
  return new DeferIterable(fn);
}