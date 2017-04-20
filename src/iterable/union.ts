'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

export class UnionIterator<T> extends IteratorX<T> {
  private _left: Iterator<T>;
  private _right: Iterator<T>;
  private _cmp: (x: T, y: T) => boolean;
  private _it: Iterator<T> | null;
  private _leftDone: boolean;
  private _rightDone: boolean;
  private _map: T[];

  constructor(left: Iterator<T>, right: Iterator<T>, cmp?: (x: T, y: T) => boolean) {
    super();
    this._left = left;
    this._right = right;
    this._cmp = cmp || ((x, y) => x === y);
    this._it = null;
    this._leftDone = false;
    this._rightDone = false;
    this._map = [];
  }

  _next() {
    while (1) {
      if (!this._it) {
        if (this._rightDone) {
          return { done: true, value: undefined };
        }

        if (!this._leftDone) {
          this._it = this._left;
          this._leftDone = true;
        } else {
          this._it = this._right;
          this._rightDone = true;
        }
      }

      const next = this._it.next();
      if (next.done) {
        this._it = null;
      } else {
        let current = next.value;
        if (arrayIndexOf(this._map, current, this._cmp) !== -1) {
          this._map.push(current);
          return next;
        }
      }
    }
  }
}

export class UnionIterable<T> extends IterableX<T> {
  private _left: Iterable<T>;
  private _right: Iterable<T>;
  private _cmp: (x: T, y: T) => boolean;

  constructor(left: Iterable<T>, right: Iterable<T>, cmp?: (x: T, y: T) => boolean) {
    super();
    this._left = left;
    this._right = right;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new UnionIterator<T>(this._left[Symbol.iterator](), this._right[Symbol.iterator](), this._cmp);
  }
}

export function union<T>(
      first: Iterable<T>,
      second: Iterable<T>,
      cmp?: (x: T, y: T) => boolean) {
  return new UnionIterable<T>(first, second, cmp);
}