/*
'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class SkipWhileIterator<T> extends IteratorX<T> {
  private _it: Iterator<T>;
  private _fn: (value: T, index: number) => boolean;
  private _i: number;
  private _skipped: boolean;

  constructor(
      it: Iterator<T>,
      fn: (value: T, index: number) => boolean) {
    super();
    this._it = it;
    this._fn = fn
    this._i = 0;
    this._skipped = false;
  }

  _next() {
    let next;
    if (!this._skipped) {
      while(1) {
        next = this._it.next();
        if (next.done) { return next; }
        if (!this._fn(next.value, this._i++)) {
          return { done: false, value: next.value };
        }
      }
      this._skipped = true;
      next = this._it.next();
      if (next.done) { return next; }
      return { done: false, value: next.value };
    }
  }
}

export class SkipWhileIterable<T> extends IterableX<T> {
  private _source: Iterable<T>;
  private _fn: (value: T, index: number) => boolean;

  constructor(
      source: Iterable<T>,
      fn: (value: T, index: number) => boolean) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new SkipWhileIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function skipWhile<T>(
    source: Iterable<T>,
    fn: (value: T, index: number) => boolean): Iterable<T> {
  return new SkipWhileIterable(source, fn);
}

*/