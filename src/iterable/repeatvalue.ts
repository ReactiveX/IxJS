'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';

class RepeatValueIterator extends Iterator {
  private _value: any;
  private _count: number;
  private _hasCount: boolean;

  constructor(value: any, count: number, hasCount: boolean) {
    super();
    this._value = value;
    this._count = count;
    this._hasCount = hasCount;
  }

  next() {
    if (this._count !== 0) {
      this._hasCount && this._count--;
      return { value: this._value, done: false };
    } else {
      return doneIterator;
    }    
  }
}

export class RepeatValueIterable extends Iterable {
  private _value: any;
  private _count: number;
  private _hasCount: boolean;

  constructor(value: any, count: number, hasCount: boolean) {
    super();
    this._value = value;
    this._count = count;
    this._hasCount = hasCount;
  }

  [Symbol.iterator]() {
    return new RepeatValueIterator(this._value, this._count, this._hasCount);
  }
}

export function repeatValue(value: any, count: number): Iterable {
  var hasCount = count == 0, ct = count == null ? -1 : count;
  return new RepeatValueIterable(value, ct, hasCount);
};
