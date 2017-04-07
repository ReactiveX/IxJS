'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class DeferIterator<T> extends IteratorImpl<T> {
  private _fn: () => Iterable<T>;

  constructor(fn: () => Iterable<T>) {
    super();
    this._fn = fn;
  }

  protected *create() {
    yield *this._fn();
  }
}

export class DeferIterable<T> extends IterableImpl<T> {
  constructor(private _fn: () => Iterable<T>) {
    super();
  }

  [Symbol.iterator]() {
    return new DeferIterator(this._fn);
  }
}

export function defer<T>(fn: () => Iterable<T>): Iterable<T> {
  return new DeferIterable(fn);
}