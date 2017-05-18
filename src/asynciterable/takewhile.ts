'use strict';

import { AsyncIterableX } from '../asynciterable';

class TakeWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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
      if (!this._predicate(item, i++)) { break; }
      yield item;
    }
  }
}

export function takeWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): AsyncIterableX<TSource> {
  return new TakeWhileAsyncIterable<TSource>(source, predicate);
}