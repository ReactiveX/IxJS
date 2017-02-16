'use strict';

import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

class ArrayIterator<T> extends Iterator<T> {
  private _source: Array<T>;
  private _len: number;
  private _index: number;

  constructor(source: Array<T>) {
    super();
    this._source = source;
    this._len = source.length;
    this._index = -1;
  }

  next() {
    return ++this._index < this._len ?
      { done: false, value: this._source[this._index] } :
      { done: true, value: undefined };    
  }
}

export class ArrayIterable<T> extends Iterable<T> {
  private _source: Array<T>;

  constructor(source: Array<T>) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() { 
    return new ArrayIterator(this._source); 
  }
}