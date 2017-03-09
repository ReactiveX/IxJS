'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

export class UnionIterator<T> extends Iterator<T> {
  private _left: IIterator<T>;
  private _right: IIterator<T>;
  private _cmp: (x: T, y: T) => boolean;
  private _it: IIterator<T>;
  private _leftDone: boolean;
  private _rightDone: boolean;
  private _map: T[];

  constructor(left: IIterator<T>, right: IIterator<T>, cmp?: (x: T, y: T) => boolean) {
    super();
    this._left = left;
    this._right = right;
    this._cmp = cmp || ((x, y) => x === y);
    this._it = null;
    this._leftDone = false;
    this._rightDone = false;
    this._map = [];
  }

  next() {
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

export class UnionIterable<T> extends Iterable<T> {
  private _left: IIterable<T>;
  private _right: IIterable<T>;
  private _cmp: (x: T, y: T) => boolean;

  constructor(left: IIterable<T>, right: IIterable<T>, cmp?: (x: T, y: T) => boolean) {
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
      first: IIterable<T>, 
      second: IIterable<T>, 
      cmp?: (x: T, y: T) => boolean) {
  return new UnionIterable<T>(first, second, cmp);
}