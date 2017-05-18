'use strict';

import { AsyncIterableX } from '../asynciterable';

class AnonymousAsyncIterable<T> extends AsyncIterableX<T> {
  private _fn: () => AsyncIterator<T>;

  constructor(fn: () => AsyncIterator<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.asyncIterator]() {
    return this._fn();
  }
}

export function create<T>(fn: () => AsyncIterator<T>): AsyncIterableX<T> {
  return new AnonymousAsyncIterable(fn);
}