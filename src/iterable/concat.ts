'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { ArrayIterator } from './arrayiterable';

export class ConcatIterator<T> extends IteratorImpl<T> {
  private _it: Iterator<IterableIterator<T>>;
  private _innerIt: Iterator<T> | null;

  constructor(...it: IterableIterator<T>[]) {
    super();
    this._it = new ArrayIterator(it);
    this._innerIt = null;
  }

  _next() {
    while (1) {
      if (!this._innerIt) {
        let outerNext = this._it.next();
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

export class ConcatIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>[];

  constructor(...source: Iterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ConcatIterator<T>(...this._source.map(x => x[Symbol.iterator]()));
  }
}

export function concat<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return new ConcatIterable(...[source].concat(...args));
}

export function concatStatic<T>(...args: Iterable<T>[]): Iterable<T> {
  return new ConcatIterable(...args);
}