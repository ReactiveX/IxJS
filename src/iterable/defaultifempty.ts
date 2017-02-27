'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';

export class DefaultIfEmptyIterator<T> extends Iterator<T> {
  private _it: IIterator<T>;
  private _defaultValue: T;
  private _state: number;

  constructor(it: IIterator<T>, defaultValue: T) {
    super();
    this._it = it;
    this._defaultValue = defaultValue;
    this._state = 1;
  }

  next() {
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

export class DefaultIfEmptyIterable<T> extends Iterable<T> {
  private _source: IIterable<T>;
  private _defaultValue: T;

  constructor(source: IIterable<T>, defaultValue: T) {
    super();
    this._source = source;
    this._defaultValue = defaultValue;
  }

  [Symbol.iterator]() {
    return new DefaultIfEmptyIterator<T>(this._source[Symbol.iterator](), this._defaultValue);
  }
}

export function defaultIfEmpty<T>(
    source: IIterable<T>,
    defaultValue: T): Iterable<T> {
  return new DefaultIfEmptyIterable<T>(source, defaultValue);
}