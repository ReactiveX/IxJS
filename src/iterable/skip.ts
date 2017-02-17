'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class SkipIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _count: number;
  private _skipped: boolean;

  constructor(it: IIterator<T>, count: number) {
    super();

    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count < 0) { throw new RangeError(); }

    this._it = it;
    this._count = count;
    this._skipped = false;
  }

  next() {
    let next;
    if (!this._skipped) {
      for (var i = 0; i < this._count; i++) {
        next = this._it.next();
        if (next.done) { return next; }
      }
      this._skipped = true;
    }
    next = this._it.next();
    if (next.done) { return next; }
    return { done: false, value: next.value };  
  }
}

export class SkipIterable<T> extends Iterable<T> {
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
    return new SkipIterator<T>(this._source[Symbol.iterator](), this._count);
  }
}

export function skip<T>(
    source: IIterable<T>, 
    count: number): Iterable<T> {
  return new SkipIterable<T>(source, count);
}