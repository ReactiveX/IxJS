'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

export class ConcatAllIterator<T> extends IteratorImpl<T> {
  constructor(private _it: Iterable<Iterable<T>>) {
    super();
  }

  protected *create() {
    for (let outer of this._it) {
      yield* outer;
    }
  }
}

export class ConcatAllIterable<T> extends IterableImpl<T> {
  private _source: Iterable<Iterable<T>>;

  constructor(source: Iterable<Iterable<T>>) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ConcatAllIterator<T>(this._source);
  }
}

export function concatAll<T>(source: Iterable<Iterable<T>>): Iterable<T> {
  return new ConcatAllIterable(source);
}