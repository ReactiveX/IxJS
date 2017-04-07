'use strict';

import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

const doneIterator = { done: true, value: undefined };

class RepeatIterator<T> extends IteratorImpl<T> {
  private _value: T;
  private _count: number;
  private _hasCount: boolean;

  constructor(value: T, count?: number) {
    super();
    this._value = value;
    this._count = count;
    this._hasCount = count != null;
  }

  _next() {
    if (this._count !== 0) {
      this._hasCount && this._count--;
      return { value: this._value, done: false };
    } else {
      return doneIterator;
    }
  }
}

export class RepeatIterable<T> extends IterableImpl<T> {
  private _value: T;
  private _count: number;

  constructor(value: T, count?: number) {
    super();
    this._value = value;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new RepeatIterator<T>(this._value, this._count);
  }
}

export function repeat<T>(value: any, count?: number): Iterable<T> {
  return new RepeatIterable<T>(value, count);
}
