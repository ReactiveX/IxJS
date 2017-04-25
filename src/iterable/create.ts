'use strict';

class AnonymousIterable<T> implements Iterable<T> {
  private _fn: () => Iterator<T>;

  constructor(fn: () => Iterator<T>) {
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return this._fn();
  }
}

export function create<T>(fn: () => Iterator<T>): Iterable<T> {
  return new AnonymousIterable(fn);
}