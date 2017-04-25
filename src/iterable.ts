'use strict';

import { bindCallback } from './internal/bindcallback';

export class IterableX<T> implements Iterable<T> {
  private _source: Iterable<T>;

  constructor(source: Iterable<T>) {
    this._source = source;
  }

  [Symbol.iterator]() {
    return this._source[Symbol.iterator]();
  }

  forEach(fn: (value: T, index: number) => void, thisArg?: any): void {
    const fun = bindCallback(fn, thisArg, 2);
    for (let item of this) {
      fun(item);
    }
  }
}