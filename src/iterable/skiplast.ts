'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class SkipLastIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _q: T[];
  private _count: number;

  constructor(it: IIterator<T>, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }

    this._it = it;
    this._q = [];
    this._count = count;
  }

  next() {
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

export class SkipLastIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _count: number;

  constructor(source: IIterable<T>, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }

    this._source = source;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new SkipLastIterator<T>(this._source[Symbol.iterator](), this._count);
  }
}

export function skipLast<T>(
    source: IIterable<T>, 
    count: number): Iterable<T> {
  return new SkipLastIterable<T>(source, count);
}