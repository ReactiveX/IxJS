'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { ConcatAllIterable } from './concatall';

class WhileIterator<T> extends IteratorImpl<Iterable<T>> {
  private _source: Iterable<T>;
  private _fn: () => boolean;

  constructor(source: Iterable<T>, fn: () => boolean) {
    super();
    this._source = source;
    this._fn = fn;
  }

  _next() {
    if (this._fn()) {
      return { done: false, value: this._source };
    } else {
      return { done: true, value: undefined };
    }
  }
}

class WhileIterable<T> extends IterableImpl<Iterable<T>> {
  private _source: Iterable<T>;
  private _fn: () => boolean;

  constructor(source: Iterable<T>, fn: () => boolean) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new WhileIterator(this._source, this._fn);
  }
}

export function _while<T>(
    source: Iterable<T>,
    fn: () => boolean): Iterable<T | undefined> {
  return new ConcatAllIterable(new WhileIterable<T>(source, fn));
}