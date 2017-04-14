'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';
import { ArrayIterable } from './arrayiterable';

export class ConcatIterator<T> extends IteratorImpl<T> {
  private _it: Iterable<Iterable<T>>;
  constructor(...it: Iterable<T>[]) {
    super();
    this._it = new ArrayIterable(it);
  }

  protected *create() {
    for (let outer of this._it) {
      yield* outer;
    }
  }
}

export class ConcatIterable<T> extends IterableImpl<T> {
  private _source: Iterable<T>[];

  constructor(...source: Iterable<T>[]) {
    super();
    this._source = source;
  }

  [Symbol.iterator]() {
    return new ConcatIterator<T>(...this._source);
  }
}

export function concat<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return new ConcatIterable(...[source].concat(...args));
}

export function concatStatic<T>(...args: Iterable<T>[]): Iterable<T> {
  return new ConcatIterable(...args);
}