'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class CatchIterator<T> extends IteratorImpl<T> {
  private _it: Iterator<T>;
  private _fn: (error: any) => Iterable<T>;
  private _errorIt: Iterator<T> | null;

  constructor(it: Iterator<T>, fn: (error: any) => Iterable<T>) {
    super();
    this._it = it;
    this._fn = fn;
    this._errorIt = null;
  }

  _next() {
    if (!this._errorIt) {
      try {
        return this._it.next();
      } catch (e) {
        this._errorIt = this._fn(e)[Symbol.iterator]();
      }
    }
      return this._errorIt.next();
  }
}

export class CatchIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>;
  private _fn: (error: any) => Iterable<T>;

  constructor(source: Iterable<T>, fn: (error: any) => Iterable<T>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new CatchIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function _catch<T>(
    source: Iterable<T>,
    fn: (error: any) => Iterable<T>): Iterable<T> {
  return new CatchIterable<T>(source, fn);
}