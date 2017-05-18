'use strict';

import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';

class FlatMapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _fn: (value: TSource) => AsyncIterable<TResult>;

  constructor(source: AsyncIterable<TSource>, fn: (value: TSource) => AsyncIterable<TResult>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    for await (let outerItem of this._source) {
      for await (let innerItem of this._fn(outerItem)) {
        yield innerItem;
      }
    }
  }
}

export function flatMap<TSource, TResult>(
    source: AsyncIterable<TSource>,
    fn: (value: TSource) => AsyncIterable<TResult>,
    thisArg?: any): AsyncIterableX<TResult> {
  return new FlatMapAsyncIterable<TSource, TResult>(source, bindCallback(fn, thisArg, 1));
}