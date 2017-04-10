'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { ArrayIterator } from './arrayiterable';

export class ConcatAllIterator<T> extends IteratorImpl<T> {
  private _it: Iterator<Iterable<T>>;
  private _innerIt: Iterator<T> | null;

  constructor(it: Iterator<Iterable<T>>) {
    super();
    this._it = it;
    this._innerIt = null;
  }

  _next() {
    let outerNext;
    while (1) {
      if (!this._innerIt) {
        outerNext = this._it.next();
        if (outerNext.done) { break; }

        let innerItem = outerNext.value;
        this._innerIt = innerItem[Symbol.iterator]();
      }

      let innerNext = this._innerIt.next();
      if (innerNext.done) {
        this._innerIt = null;
      } else {
        return { done: false, value: innerNext.value };
      }
    }
    return { done: true, value: undefined };
  }
}

export class ConcatAllIterable<T> extends IterableImpl<T> {
  private _source: Iterable<Iterable<T>>;

  constructor(source: Iterable<Iterable<T>>) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ConcatAllIterator<T>(this._source[Symbol.iterator]());
  }
}

export function concatAll<T>(source: Iterable<Iterable<T>>): Iterable<T> {
  return new ConcatAllIterable(source);
}