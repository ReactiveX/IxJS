'use strict';

import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class CatchIterator<T> extends IteratorX<T> {
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

export class CatchIterable<T> extends IterableX<T> {
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