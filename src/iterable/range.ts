'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { doneIterator } from '../internal/doneiterator';

class RangeIterator extends Iterator {
  private _current: number;
  private _end: number;

  constructor(start: number, count: number) {
    super();
    this._current = start + 1;
    this._end = start + count - 1;
  }

  next() {
    return this._current++ < this._end ?
      { done: false, value: this._current } :
      doneIterator;    
  }
}

export class RangeIterable extends Iterable {
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

export function range(start: number, count: number): Iterable {
  return new RangeIterable(start, count);
}
