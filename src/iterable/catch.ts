'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class CatchIterator<T> extends IteratorImpl<T> {
  constructor(private _it: Iterable<T>, private _fn: (error: any) => Iterable<T>) {
    super();
  }

  protected *create(): Iterator<T> {
    try {
      yield* this._it;
    } catch (e) {
      yield* this._fn(e);
    }
  }
}

export class CatchIterable<T> extends IterableImpl<T> {
  constructor(private _source: Iterable<T>, private _fn: (error: any) => Iterable<T>) {
    super();
  }

  [Symbol.iterator]() {
    return new CatchIterator<T>(this._source, this._fn);
  }
}

export function _catch<T>(
  source: Iterable<T>,
  fn: (error: any) => Iterable<T>): Iterable<T> {
  return new CatchIterable<T>(source, fn);
}