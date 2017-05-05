'use strict';

class AnonymousAsyncIterable<T> implements AsyncIterable<T> {
  private _fn: () => AsyncIterator<T>;

  constructor(fn: () => AsyncIterator<T>) {
    this._fn = fn;
  }

  [Symbol.asyncIterator]() {
    return this._fn();
  }
}

export function create<T>(fn: () => AsyncIterator<T>): AsyncIterable<T> {
  return new AnonymousAsyncIterable(fn);
}