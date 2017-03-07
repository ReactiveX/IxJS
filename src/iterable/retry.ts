'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class RetryIterator<T> extends Iterator<T> {
  private _source: IIterable<T>;
  private _it: IIterator<T>;
  private _count: number;
  private _hasCount: boolean;

  constructor(source: IIterable<T>, count?: number) {
    super();
    this._source = source;
    this._it = null;
    this._count = count;
    this._hasCount = count != null;
  }

  next() {
    this._it || (this._it = this._source[Symbol.iterator]());
    while(1) {
      let next;
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

export class RetryIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _count: number;

  constructor(source: IIterable<T>, count?: number) {
    super();
    this._source = source;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new RetryIterator<T>(this._source, this._count);
  }
}

export function retry<T>(source: IIterable<T>, count?: number) {
  return new RetryIterable<T>(source, count);
}