'use strict';

import { create } from './create';

class SharedIterable<T> implements Iterable<T> {
  private _it: Iterator<T>;

  constructor(it: Iterator<T>) {
    this._it = it;
  }

  [Symbol.iterator]() {
    return this._it;
  }
}

export function share<TSource, TResult>(
    source: Iterable<TSource>,
    fn?: (value: Iterable<TSource>) => Iterable<TResult>): Iterable<TSource | TResult> {
  return fn ?
    create(() => fn(new SharedIterable(source[Symbol.iterator]()))[Symbol.iterator]()) :
    new SharedIterable(source[Symbol.iterator]());
}