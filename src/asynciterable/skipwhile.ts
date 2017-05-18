'use strict';

import { AsyncIterableX } from '../asynciterable';

class SkipWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: AsyncIterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let it = this._source[Symbol.asyncIterator](), i = 0, next;
    while (!(next = await it.next()).done) {
      if (!this._predicate(next.value, i++)) {
        yield next.value;
        while (!(next = await it.next()).done) {
          yield next.value;
        }
      }
    }
  }
}

export function skipWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): AsyncIterableX<TSource> {
  return new SkipWhileAsyncIterable<TSource>(source, predicate);
}