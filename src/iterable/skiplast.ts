'use strict';

import { Iterable, IIterable } from '../iterable';
import { Iterator, IIterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';

export class SkipLastIterator extends Iterator {
  private _it: IIterator;
  private _q: Array<any>;
  private _count: number;

  constructor(it: IIterator, count: number) {
    super();
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

export class SkipLastIterable extends Iterable {
  private _source: IIterable;
  private _count: number;

  constructor(source: IIterable, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }

    this._source = source;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new SkipLastIterator(this._source[Symbol.iterator](), this._count);
  }
}

export function skipLast(source: IIterable, count: number): Iterable {
  return new SkipLastIterable(source, count);
}