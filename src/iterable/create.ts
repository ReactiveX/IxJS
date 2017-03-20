'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

class AnonymousIterable<T> extends Iterable<T> {
  private _fn: () => IIterator<T>;

  constructor(fn: () => IIterator<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return this._fn();
  }
}

export function create<T>(fn: () => IIterator<T>): Iterable<T> {
  return new AnonymousIterable(fn);
}