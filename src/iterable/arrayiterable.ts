'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class ArrayIterator<T> extends IteratorX<T> {
  private _len: number;
  private _index: number;

  constructor(private _source: T[]) {
    super();
    this._len = _source.length;
    this._index = -1;
  }

  protected *create() {
    while (++this._index < this._len) {
      yield this._source[this._index];
    }
  }
}

export class ArrayIterable<T> extends IterableX<T> {
  private _source: T[];

  constructor(source: T[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ArrayIterator(this._source);
  }
}