'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class BufferIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _count: number;
  private _skip: number;
  private _q: T[][];
  private _i: number;
  private _hv: boolean;

  constructor(it: IIterator<T>, count: number, skip: number) {
    super();
    this._it = it;
    this._count = count;
    this._skip = skip;
    this._q = [];
    this._i = 0;
    this._hv = false;
  }

  next() {
    while (1) {
      this._hv && this._i++; 
      
      let next = this._it.next();
      if (next.done) {
        return this._q.length > 0 ?
          { done: false, value: this._q.shift() } :
          next;
      }
      
      this._hv = true;
      
      this._i % this._skip === 0 && this._q.push([]);
      for (var i = 0; i < this._q.length; i++) { this._q[i].push(next.value); }
      if (this._q.length > 0 && this._q[0].length === this._count) {
        return { done: false, value: this._q.shift() };
      }    
    }    
  }
}

export class BufferIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _count: number;
  private _skip: number;

  constructor(source: IIterable<T>, count: number, skip: number) {
    super();

    skip == null || (skip = count);

    this._source = source;
    this._count = count;
    this._skip = skip;
  }

  [Symbol.iterator]() {
    return new BufferIterator(this._source[Symbol.iterator](), this._count, this._skip);
  }
}

export function buffer<T>(source: IIterable<T>, count: number, skip?: number) {
  return new BufferIterable(source, count, skip);
}