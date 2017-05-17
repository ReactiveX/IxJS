'use strict';

import { IterableX } from '../iterable';
import { bindCallback } from '../internal/bindcallback';

class FlatMapIterable<TSource, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource) => Iterable<TResult>;

  constructor(source: Iterable<TSource>, fn: (value: TSource) => Iterable<TResult>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    for (let outerItem of this._source) {
      for (let innerItem of this._fn(outerItem)) {
        yield innerItem;
      }
    }
  }
}

export function flatMap<TSource, TResult>(
    source: Iterable<TSource>,
    fn: (value: TSource) => Iterable<TResult>,
    thisArg?: any): IterableX<TResult> {
  return new FlatMapIterable<TSource, TResult>(source, bindCallback(fn, thisArg, 1));
}