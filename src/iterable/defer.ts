'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class DeferIterator<T> extends IteratorX<T> {
  private _fn: () => Iterable<T>;

  constructor(fn: () => Iterable<T>) {
    super();
    this._fn = fn;
  }

  protected *create() {
    yield *this._fn();
  }
}

export class DeferIterable<T> extends IterableX<T> {
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