'use strict';

import { IIterable, IIterator } from '../iterable.interfaces';
import { Iterable } from '../iterable';
import { Iterator } from '../iterator';
import { arrayIndexOf } from '../internal/arrayindexof';

function arrayRemove<T>(array: T[], item: T, comparer: (x: T, y: T) => boolean): boolean {
  var idx = arrayIndexOf(array, item, comparer);
  if (idx === -1) { return false; }
  array.splice(idx, 1);
  return true;
}

export class IntersectIterator<T> extends Iterator<T> {
  private _second: IIterator<T>;
  private _map: T[];
  private _cmp: (x: T, y: T) => boolean;

  constructor(
      first: IIterator<T>, 
      second: IIterator<T>, 
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

  next() {
    while(1) {
      let next = this._second.next();
      if (next.done) { return { done: true, value: undefined }; }
      if (arrayRemove(this._map, next.value, this._cmp)) {
        return { done: false, value: next.value };
      }
    }
  }
}

export class IntersectIterable<T> extends Iterable<T> {
  private _first: IIterable<T>;
  private _second: IIterable<T>;
  private _cmp: (x: T, y: T) => boolean;

  constructor(
      first: IIterable<T>, 
      second: IIterable<T>, 
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
      first: IIterable<T>, 
      second: IIterable<T>, 
      cmp?: (x: T, y: T) => boolean) {
  return new IntersectIterable<T>(first, second, cmp);
}