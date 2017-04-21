/*
'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

function arrayRemove<T>(array: T[], item: T, comparer: (x: T, y: T) => boolean): boolean {
  var idx = arrayIndexOf(array, item, comparer);
  if (idx === -1) { return false; }
  array.splice(idx, 1);
  return true;
}

export class IntersectIterator<T> extends IteratorX<T> {
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
      if (next.done) { break; }
      if (arrayRemove(this._map, next.value, this._cmp)) {
        return { done: false, value: next.value };
      }
    }
    return { done: true, value: undefined };
  }
}

export class IntersectIterable<T> extends IterableX<T> {
  private _first: Iterable<T>;
  private _second: Iterable<T>;
  private _cmp?: (x: T, y: T) => boolean;

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
    return new IntersectIterator<T>(this._first[Symbol.iterator](), this._second[Symbol.iterator](), this._cmp);
  }
}

export function intersect<T>(
      first: Iterable<T>,
      second: Iterable<T>,
      cmp?: (x: T, y: T) => boolean) {
  return new IntersectIterable<T>(first, second, cmp);
}
*/