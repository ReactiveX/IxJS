'use strict';


import { IterableImpl } from '../iterable';

class AnonymousIterable<T> extends IterableImpl<T> {
  private _fn: () => Iterator<T>;

  constructor(fn: () => Iterator<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return this._fn();
  }
}

export function create<T>(fn: () => Iterator<T>): Iterable<T> {
  return new AnonymousIterable(fn);
}