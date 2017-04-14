'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class DefaultIfEmptyIterator<T> extends IteratorImpl<T> {
  private _defaultValue: T;
  private _state: number;

  constructor(private _it: Iterable<T>, defaultValue: T) {
    super();
    this._defaultValue = defaultValue;
    this._state = 1;
  }

  protected *create() {
    for (let item of this._it) {
      this._state = 2;
      yield item;
    }
    if (this._state === 1) {
      yield this._defaultValue;
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
    return new DefaultIfEmptyIterator<T>(this._source, this._defaultValue);
  }
}

export function defaultIfEmpty<T>(source: Iterable<T>, defaultValue: T): Iterable<T> {
  return new DefaultIfEmptyIterable<T>(source, defaultValue);
}