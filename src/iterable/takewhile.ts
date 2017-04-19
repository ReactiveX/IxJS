/*

'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class TakeWhileIterator<T> extends IteratorX<T> {
  private _it: Iterator<T>;
  private _fn: (value: T, index: number) => boolean;
  private _i: number;

  constructor(
      it: Iterator<T>,
      fn: (value: T, index: number) => boolean) {
    super();
    this._it = it;
    this._fn = fn
  }

  _next() {
    let next = this._it.next();
    if (next.done) { return next; }
    if (!this._fn(next.value, this._i++)) {
      return { done: true, value: undefined };
    } else {
      return { done: false, value: next.value };
    }
  }
}

export class TakeWhileIterable<T> extends IterableX<T> {
  private _source: Iterable<T>;
  private _fn: (value: T, index: number) => boolean;

  constructor(
      source: Iterable<T>,
      fn: (value: T, index: number) => boolean,
      thisArg?: any) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new TakeWhileIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function takeWhile<T>(
    source: Iterable<T>,
    fn: (value: T, index: number) => boolean): Iterable<T> {
  return new TakeWhileIterable<T>(source, fn);
}

*/