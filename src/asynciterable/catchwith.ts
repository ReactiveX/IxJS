'use strict';

import { AsyncIterableX } from '../asynciterable';

class CatchWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _fn: (error: any) => AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>, fn: (error: any) => AsyncIterable<TSource>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    let err = null, it = this._source[Symbol.asyncIterator]();
    while (1) {
      let c = <IteratorResult<TSource>>{};

      try {
        let c = await it.next();
        if (c.done) { break; }
      } catch (e) {
        err = this._fn(e);
        break;
      }

      yield c.value;
    }

    if (err !== null) {
      for await (let item of err) {
        yield item;
      }
    }
  }
}

export function catchWith<TSource>(
    source: AsyncIterable<TSource>,
    fn: (error: any) => AsyncIterable<TSource>): AsyncIterableX<TSource> {
  return new CatchWithAsyncIterable<TSource>(source, fn);
}