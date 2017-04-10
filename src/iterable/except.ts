'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

export class ExceptIterator<T> extends IteratorImpl<T> {
  private _second: Iterator<T>;
  private _map: T[];
  private _cmp: (x: T, y: T) => boolean;

  constructor(
      first: Iterator<T>,
      second: Iterator<T>,
      cmp?: (x: T, y: T) => boolean) {
    super();
    this._map = [];
    this._second = second;
    this._cmp = cmp || ((x, y) => x === y);

    let next;
    while (!(next = first.next()).done) {
      this._map.push(next.value);
    }
  }

  _next() {
    while(1) {
      let next = this._second.next();
      if (next.done) { return { done: true, value: undefined }; }
      if (arrayIndexOf(this._map, next.value, this._cmp) !== -1) {
        this._map.push(next.value);
        return next;
      }
    }
  }
}

export class ExceptIterable<T> extends IterableImpl<T> {
  private _first: Iterable<T>;
  private _second: Iterable<T>;
  private _cmp: (x: T, y: T) => boolean;

  constructor(
      first: Iterable<T>,
      second: Iterable<T>,
      cmp?: (x: T, y: T) => boolean) {
    super();
    this._first = first;
    this._second = second;
    this._cmp = cmp;
  }

  [Symbol.iterator]() {
    return new ExceptIterator<T>(this._first[Symbol.iterator](), this._second[Symbol.iterator](), this._cmp);
  }
}

export function except<T>(
      first: Iterable<T>,
      second: Iterable<T>,
      cmp?: (x: T, y: T) => boolean) {
  return new ExceptIterable<T>(first, second, cmp);
}