'use strict';

import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';
import { identity } from '../internal/identity';
import { toLength } from '../internal/tolength';
import { isIterable } from '../internal/isiterable';

class FromAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: Iterable<TSource> | ArrayLike<TSource>;
  private _fn: (value: TSource, index: number) => TResult;

  constructor(source: Iterable<TSource> | ArrayLike<TSource>, fn: (value: TSource, index: number) => TResult) {
    super();
    this._source = source;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    const iterable = isIterable(this._source);
    let i = 0;
    if (iterable) {
      for (let item of <Iterable<TSource>>this._source) {
        yield this._fn(item, i++);
      }
    } else {
      let length = toLength((<ArrayLike<TSource>>this._source).length);
      while (i < length) {
        let val = (<ArrayLike<TSource>>this._source)[i];
        yield this._fn(val, i++);
      }
    }
  }
}

export function from<TSource, TResult>(
    source: Iterable<TSource> | ArrayLike<TSource>,
    fn: (value: TSource, index: number) => TResult = identity,
    thisArg?: any): AsyncIterableX<TResult> {
  return new FromAsyncIterable<TSource, TResult>(source, bindCallback(fn, thisArg, 2));
}