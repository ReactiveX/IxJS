'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

const doneIterator = { done: true, value: undefined };

export class ArrayIterator<T> extends Iterator<T> {
  private _source: T[];
  private _len: number;
  private _index: number;

  constructor(source: T[]) {
    super();
    this._source = source;
    this._len = source.length;
    this._index = -1;
  }

  next() {
    return ++this._index < this._len ?
      { done: false, value: this._source[this._index] } :
      doneIterator;    
  }
}

export class ArrayIterable<T> extends Iterable<T> {
  private _source: T[];

  constructor(source: T[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() { 
    return new ArrayIterator(this._source); 
  }
}