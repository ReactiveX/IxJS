'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class CatchIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _fn: (error: any) => IIterable<T>;
  private _errorIt: IIterator<T>;

  constructor(it: IIterator<T>, fn: (error: any) => IIterable<T>) {
    super();
    this._it = it;
    this._fn = fn;
    this._errorIt = null;
  }

  next() {
    if (!this._errorIt) {
      try {
        return this._it.next();
      } catch (e) {
        this._errorIt = this._fn(e)[Symbol.iterator]();
      }
    } else {
      return this._errorIt.next();
    }
  }
}

export class CatchIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _fn: (error: any) => IIterable<T>;

  constructor(source: IIterable<T>, fn: (error: any) => IIterable<T>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return new CatchIterator<T>(this._source[Symbol.iterator](), this._fn);
  }
}

export function _catch<T>(
    source: IIterable<T>,
    fn: (error: any) => IIterable<T>): Iterable<T> {
  return new CatchIterable<T>(source, fn);
}