'use strict';

import { IterableX } from '../iterable';

class ConcatIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    for (let outer of this._source) { yield* outer; }
  }
}

export function concatAll<TSource>(source: Iterable<Iterable<TSource>>): IterableX<TSource> {
  return new ConcatIterable<TSource>(source);
}

export function concat<T>(source: Iterable<T>, ...args: Iterable<T>[]): IterableX<T> {
  return new ConcatIterable([source, ...args]);
}

export function concatStatic<T>(...args: Iterable<T>[]): IterableX<T> {
  return new ConcatIterable(args);
}