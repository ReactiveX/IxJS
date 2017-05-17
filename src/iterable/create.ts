'use strict';

import { IterableX } from '../iterable';

class AnonymousIterable<T> extends IterableX<T> {
  private _fn: () => Iterator<T>;

  constructor(fn: () => Iterator<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return this._fn();
  }
}

export function create<T>(fn: () => Iterator<T>): IterableX<T> {
  return new AnonymousIterable(fn);
}