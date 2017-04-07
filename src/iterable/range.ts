'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

class RangeIterator extends IteratorImpl<number> {
  private _current: number;
  private _end: number;

  constructor(start: number, count: number) {
    super();
    this._current = start + 1;
    this._end = start + count - 1;
  }

  _next() {
    return this._current++ < this._end ?
      { done: false, value: this._current } :
      { done: true, value: undefined };
  }
}

export class RangeIterable extends IterableImpl<number> {
  private _start: number;
  private _count: number;

  constructor(start: number, count: number) {
    super();
    this._start = start;
    this._count = count;
  }

  [Symbol.iterator]() {
    return new RangeIterator(this._start, this._count);
  }
}

export function range(start: number, count: number): Iterable<number> {
  return new RangeIterable(start, count);
}
