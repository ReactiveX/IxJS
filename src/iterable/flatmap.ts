'use strict';
import { identity } from '../internal/identity';


import { IterableX } from '../iterable';
import { IteratorX } from '../iterator';

export class FlatMapIterator<TSource, TCollection, TResult> extends IteratorX<TResult> {
  private _innerIt: Iterator<TCollection> | null;
  private _i: number;

  constructor(
      private _it: Iterable<TSource>,
      private _fn: (value: TSource, index: number) => Iterable<TCollection>,
      private _resFn: (value: TSource, current: TCollection) => TResult = identity) {
    super();
    this._innerIt = null;
    this._i = 0;
  }

  protected *create() {
    for (let outer of this._it) {
      const innerItem = this._fn(outer, this._i++);
      for (let inner of innerItem) {
        yield this._resFn(outer, inner);
      }
    }
  }
}

export class FlatMapIterable<TSource, TCollection, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource, index: number) => Iterable<TCollection>;
  private _resFn?: (value: TSource, current: TCollection) => TResult;

  constructor(
      source: Iterable<TSource>,
      fn: (value: TSource, index: number) => Iterable<TCollection>,
      resFn?: (value: TSource, current: TCollection) => TResult) {
    super();
    this._source = source;
    this._fn = fn;
    this._resFn = resFn;
  }

  [Symbol.iterator]() {
    return new FlatMapIterator<TSource, TCollection, TResult>(this._source, this._fn, this._resFn);
  }
}

export function flatMap<TSource, TCollection, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource, index: number) => Iterable<TCollection>,
    resFn?: (value: TSource, current: TCollection) => TResult): Iterable<TResult> {
  return new FlatMapIterable(source, fn, resFn);
}