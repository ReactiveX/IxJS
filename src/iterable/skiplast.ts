/*
'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class SkipLastIterator<T> extends IteratorX<T> {
  private _it: Iterator<T>;
  private _q: T[];
  private _count: number;

  constructor(it: Iterator<T>, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }

    this._it = it;
    this._q = [];
    this._count = count;
  }

  _next() {
    while (1) {
      let next = this._it.next();
      if (next.done) { return next; }
      this._q.push(next.value);
      if (this._q.length > this._count) {
        return { done: false, value: this._q.shift() };
      }
    }
  }
}

export class SkipLastIterable<T> extends IterableX<T> {
  private _source: Iterable<T>;
  private _count: number;

  constructor(source: Iterable<T>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new SkipLastIterator<T>(this._source[Symbol.iterator](), this._count);
  }
}

export function skipLast<T>(
    source: Iterable<T>,
    count: number): Iterable<T> {
  return new SkipLastIterable<T>(source, count);
}
*/