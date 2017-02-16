'use strict';

import { IIterable } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { AnonymousIterator } from './anonymousiterator';

export class DeferIterable<T> extends Iterable<T> {
  private _fn: () => IIterable<T>;

  constructor(fn: () => IIterable<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new AnonymousIterator(this._fn()[Symbol.iterator]());
  }
}

export function defer<T>(fn: () => IIterable<T>): Iterable<T> {
  return new DeferIterable(fn);
}