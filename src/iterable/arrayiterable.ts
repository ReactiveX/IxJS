'use strict';

import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

const doneIterator = { done: true, value: undefined };

export class ArrayIterator<T> extends IteratorImpl<T> {
  private _source: T[];
  private _len: number;
  private _index: number;

  constructor(source: T[]) {
    super();
    this._source = source;
    this._len = source.length;
    this._index = -1;
  }

  _next() {
    return ++this._index < this._len ?
      { done: false, value: this._source[this._index] } :
      doneIterator;
  }
}

export class ArrayIterable<T> extends IterableImpl<T> {
  private _source: T[];

  constructor(source: T[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ArrayIterator(this._source);
  }
}