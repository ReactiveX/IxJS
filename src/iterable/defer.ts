'use strict';

import { IIterable, Iterable } from '../iterable';
import { AnonymousIterator } from './anonymousiterator';

export class DeferIterable extends Iterable {
  private _fn: () => IIterable;

  constructor(fn: () => IIterable) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new AnonymousIterator(this._fn());
  }
}

export function defer(fn: () => IIterable) {
  return new DeferIterable(fn);
}