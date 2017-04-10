'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { ArrayIterator } from './arrayiterable';

export class CatchAllIterator<T> extends IteratorImpl<T> {
  private _it: Iterator<T>;
  private _innerIt: Iterator<T> | null;
  private _error: any;
  private _hasError: boolean;

  constructor(...it: any[]) {
    super();
    this._it = new ArrayIterator(it);
    this._innerIt = null;
    this._error = null;
    this._hasError = false;
  }

  _next() {
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
          innerNext = this._innerIt!.next();
        } catch (e) {
          this._error = e;
          break;
        }

        return innerNext;
      }

      if (this._hasError) { break; }
    }
    return { done: true, value: undefined };
  }
}

export class CatchAllIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>[];

  constructor(...source: Iterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new CatchAllIterator<T>(...this._source.map(x => x[Symbol.iterator]()));
  }
}

export function catchAll<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...[source].concat(args));
}

export function catchAllStatic<T>(...source: Iterable<T>[]): Iterable<T> {
  return new CatchAllIterable<T>(...source);
}

