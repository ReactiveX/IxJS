'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

class IgnoreElementsIterator<T> extends IteratorImpl<T> {
  private _it: Iterator<T>;

  constructor(it: Iterator<T>) {
    super();
    this._it = it;
  }

  _next() {
    while (1) {
      let next = this._it.next();
      if (next.done) { break; }
    }
    return { done: true, value: undefined };
  }
}

class IgnoreElementsIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>;

  constructor(source: Iterable<T>) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new IgnoreElementsIterator(this._source[Symbol.iterator]());
  }
}

export function ignoreElements<T>(source: Iterable<T>): Iterable<T> {
  return new IgnoreElementsIterable(source);
};