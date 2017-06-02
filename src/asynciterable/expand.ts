'use strict';

import { AsyncIterableX } from '../asynciterable';

class ExpandAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _fn: (value: TSource) => AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>, fn: (value: TSource) => AsyncIterable<TSource>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    let q = [this._source];
    while (q.length > 0) {
      let src = q.shift();
      for await (let item of src!) {
        q.push(this._fn(item));
        yield item;
      }
    }
  }
}

export function expand<TSource>(
    source: AsyncIterable<TSource>,
    fn: (value: TSource) => AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new ExpandAsyncIterable<TSource>(source, fn);
}