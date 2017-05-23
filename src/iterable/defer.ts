'use strict';

import { IterableX } from '../iterable';

class DeferIterable<T> extends IterableX<T> {
  private _fn: () => Iterable<T>;

  constructor(fn: () => Iterable<T>) {
    super();
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    for (let item of this._fn()) {
      yield item;
    }
  }
}

export function defer<TSource>(fn: () => Iterable<TSource>): IterableX<TSource> {
  return new DeferIterable<TSource>(fn);
}