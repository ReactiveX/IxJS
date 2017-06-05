'use strict';

import { AsyncIterableX } from '../asynciterable';

class CatchWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _handler: (error: any) => AsyncIterable<TSource>;

  constructor(
      source: AsyncIterable<TSource>,
      handler: (error: any) => AsyncIterable<TSource>) {
    super();
    this._source = source;
    this._handler = handler;
  }

  async *[Symbol.asyncIterator]() {
    let err: AsyncIterable<TSource> | undefined, hasError = false, it = this._source[Symbol.asyncIterator]();
    while (1) {
      let c = <IteratorResult<TSource>>{};

      try {
        let c = await it.next();
        if (c.done) { break; }
      } catch (e) {
        err = this._handler(e);
        hasError = true;
        break;
      }

      yield c.value;
    }

    if (hasError) {
      for await (let item of err!) {
        yield item;
      }
    }
  }
}

export function catchWith<TSource>(
    source: AsyncIterable<TSource>,
    handler: (error: any) => AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new CatchWithAsyncIterable<TSource>(source, handler);
}