'use strict';


import { IterableImpl } from '../iterable';
import { IteratorImpl } from '../iterator';

class FlatMapIterator<TSource, TCollection, TResult> extends IteratorImpl<TResult> {
  private _it: Iterator<TSource>;
  private _innerIt: Iterator<TCollection> | null;
  private _fn: (value: TSource, index: number) => Iterable<TCollection>;
  private _resFn?: (value: TSource, current: TCollection) => TResult;
  private _i: number;

  constructor(
      it: Iterator<TSource>,
      fn: (value: TSource, index: number) => Iterable<TCollection>,
      resFn?: (value: TSource, current: TCollection) => TResult) {
    super();
    this._it = it;
    this._innerIt = null;
    this._resFn = resFn;
    this._i = 0;
  }

  _next() {
    let outerNext;
    while(1) {
      if (!this._innerIt) {
        outerNext = this._it.next();
        if (outerNext.done) { break; }

        let innerItem = this._fn(outerNext.value, this._i++);
        this._innerIt = innerItem[Symbol.iterator]();
      }

      let innerNext = this._innerIt.next();
      if (innerNext.done) {
        this._innerIt = null;
      } else {
        return {
          done: false,
          value: this._resFn ? this._resFn(outerNext!.value, innerNext.value) : innerNext.value
        };
      }
    }
    return { done: true, value: undefined };
  }
}

export class FlatMapIterable<TSource, TCollection, TResult> extends IterableImpl<TResult> {
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
    return new FlatMapIterator<TSource, TCollection, TResult>(this._source[Symbol.iterator](), this._fn, this._resFn);
  }
}

export function flatMap<TSource, TCollection, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource, index: number) => Iterable<TCollection>,
    resFn?: (value: TSource, current: TCollection) => TResult): Iterable<TResult> {
  return new FlatMapIterable(source, fn, resFn);
}