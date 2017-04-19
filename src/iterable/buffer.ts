'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class BufferIterator<T> extends IteratorX<T[]> {
  private _q: T[][];
  private _i: number;
  private _hasValue: boolean;

  constructor(private _it: Iterable<T>, private _count: number, private _skip: number) {
    super();
    this._q = [];
    this._i = 0;
    this._hasValue = false;
  }

  protected *create() {
    for (let nextItem of this._it) {
      // tslint:disable-next-line:no-unused-expression
      this._hasValue && this._i++;
      this._hasValue = true;
      // tslint:disable-next-line:no-unused-expression
      this._i % this._skip === 0 && this._q.push([]);
      for (let i = 0; i < this._q.length; i++) { this._q[i].push(nextItem); }
      if (this._q.length > 0 && this._q[0].length === this._count) {
        yield this._q.shift()!;
      }
    }
    if (this._q.length > 0) {
      yield this._q.shift()!;
    }
  }
}

export class BufferIterable<T> extends IterableX<T[]> {
  constructor(private _source: Iterable<T>, private _count: number, private _skip = _count) {
    super();
  }

  [Symbol.iterator]() {
    return new BufferIterator(this._source, this._count, this._skip);
  }
}

export function buffer<T>(source: Iterable<T>, count: number, skip?: number): IterableX<T[]> {
  return new BufferIterable(source, count, skip);
}
