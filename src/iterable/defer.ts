'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class DeferIterator<T> extends Iterator<T> {
  private _fn: () => IIterable<T>;
  private _it: IIterator<T>;

  constructor(fn: () => IIterable<T>) {
    super();
    this._fn = fn;
    this._it = null;
  }

  next() {
    if (!this._it) {
      this._it = this._fn()[Symbol.iterator]();
    }
    return this._it.next();
  }
}

export class DeferIterable<T> extends Iterable<T> {
  private _fn: () => IIterable<T>;

  constructor(fn: () => IIterable<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new DeferIterator(this._fn);
  }
}

export function defer<T>(fn: () => IIterable<T>): Iterable<T> {
  return new DeferIterable(fn);
}