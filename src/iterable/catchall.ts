'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { ArrayIterator } from './arrayiterable';

export class CatchAllIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _innerIt: IIterator<T>;
  private _error: any;
  private _hasError: boolean;

  constructor(...it) {
    super();
    this._it = new ArrayIterator(it);
    this._innerIt = null;
    this._error = null;
    this._hasError = false;
  }

  next() {
    let outerNext;
    while (1) {
      while (1) {
        if (!this._innerIt) {
          outerNext = this._it.next();
          if (outerNext.done) {
            if (this._hasError) { throw this._error; }
            return { done: true, value: undefined };
          }
          this._hasError = false;
          this._error = null;
          this._innerIt = outerNext.value[Symbol.iterator]();
        }

        let innerNext;
        try {
          innerNext = this._innerIt.next();
        } catch (e) {
          this._error = e;
          break;
        }

        return innerNext;
      }

      if (this._hasError) { break; }
    }
  }
}

export class CatchAllIterable<T> extends Iterable<T> {
  private _source: IIterable<T>[];

  constructor(...source: IIterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new CatchAllIterator<T>(...this._source.map(x => x[Symbol.iterator]()));
  }
}

export function catchAll<T>(source: IIterable<T>, ...args: IIterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...[source].concat(args));
}

export function catchAllStatic<T>(...source: IIterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...source);
}

