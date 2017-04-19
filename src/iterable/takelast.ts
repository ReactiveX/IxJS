/*

'use strict';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class TakeLastIterator<T> extends IteratorX<T> {
  private _it: Iterator<T>;
  private _count: number;
  private _q: T[];

  constructor(it: Iterator<T>, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }

    this._it = it;
    this._count = count;
    this._q = [];
  }

  _next() {
    let next;
    while (!(next = this._it.next()).done) {
      if (this._q.length >= this._count) { this._q.shift(); }
      this._q.push(next.value);
    }
    if (this._q.length > 0) {
      return { done: false, value: this._q.shift() };
    } else {
      return { done: true, value: undefined };
    }
  }
}

export class TakeLastIterable<T> extends IterableX<T> {
  private _source: Iterable<T>;
  private _count: number;

  constructor(source: Iterable<T>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new TakeLastIterator<T>(this._source[Symbol.iterator](), this._count);
  }
}

export function takeLast<T>(
    source: Iterable<T>,
    count: number): Iterable<T> {
  return new TakeLastIterable<T>(source, count);
}

*/