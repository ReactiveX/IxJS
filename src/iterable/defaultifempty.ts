'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class DefaultIfEmptyIterator<T> extends IteratorImpl<T> {
  private _it: Iterator<T>;
  private _defaultValue: T;
  private _state: number;

  constructor(it: Iterator<T>, defaultValue: T) {
    super();
    this._it = it;
    this._defaultValue = defaultValue;
    this._state = 1;
  }

  _next() {
    const next = this._it.next();
    if (this._state === 1) {
      if (next.done) {
        this._state = -1;
        return { done: false, value: this._defaultValue };
      } else {
        this._state = 2;
        return next;
      }
    } else if (this._state === 2) {
      return next;
    } else {
      return { done: true, value: undefined };
    }
  }
}

export class DefaultIfEmptyIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>;
  private _defaultValue: T;

  constructor(source: Iterable<T>, defaultValue: T) {
    super();
    this._source = source;
    this._defaultValue = defaultValue;
  }

  [Symbol.iterator]() {
    return new DefaultIfEmptyIterator<T>(this._source[Symbol.iterator](), this._defaultValue);
  }
}

export function defaultIfEmpty<T>(
    source: Iterable<T>,
    defaultValue: T): Iterable<T> {
  return new DefaultIfEmptyIterable<T>(source, defaultValue);
}