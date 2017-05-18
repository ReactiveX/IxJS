'use strict';

import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';

class FilterAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: AsyncIterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of this._source) {
      if (this._predicate(item, i++)) {
        yield item;
      }
    }
  }
}

export function filter<T>(
    source: AsyncIterable<T>,
    predicate: (value: T, index: number) => boolean,
    thisArg?: any): AsyncIterableX<T> {
  return new FilterAsyncIterable<T>(source, bindCallback(predicate, thisArg, 2));
}