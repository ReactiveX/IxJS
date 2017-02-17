'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class TakeIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _i: number;

  constructor(it: IIterator<T>, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }
    
    this._it = it;
    this._i = count;
  }

  next() {
    var next = this._it.next();
    if (next.done) { return next; }
    if (this._i-- === 0) { return { done: true, value: undefined }; }
    return { value: next.value, done: false };    
  }
}

export class TakeIterable<T> extends Iterable<T> {
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
    return new TakeIterator<T>(this._source[Symbol.iterator](), this._count);
  }
}

export function take<T>(
    source: IIterable<T>, 
    count: number): Iterable<T> {
  return new TakeIterable(source, count);
}
