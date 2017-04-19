/*
'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class RetryIterator<T> extends IteratorX<T> {
  private _source: Iterable<T>;
  private _it: Iterator<T> | null;
  private _count?: number;
  private _hasCount: boolean;

  constructor(source: Iterable<T>, count?: number) {
    super();
    this._source = source;
    this._it = null;
    this._count = count;
    this._hasCount = count != null;
  }

  _next() {
    this._it || (this._it = this._source[Symbol.iterator]());
    while(1) {
      try {
        return this._it.next();
      } catch (e) {
        if (this._hasCount && --this._count === 0) {
          throw e;
        } else {
          this._it = this._source[Symbol.iterator]();
        }
      }
    }
  }
}

export class RetryIterable<T> extends IterableX<T> {
  private _source: Iterable<T>;
  private _count: number;

  constructor(source: Iterable<T>, count?: number) {
    super();
    this._source = source;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new RetryIterator<T>(this._source, this._count);
  }
}

export function retry<T>(source: Iterable<T>, count?: number) {
  return new RetryIterable<T>(source, count);
}
*/