'use strict';

import { IterableX } from '../iterable';

class CatchWithIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _handler: (error: any) => Iterable<TSource>;

  constructor(source: Iterable<TSource>, handler: (error: any) => Iterable<TSource>) {
    super();
    this._source = source;
    this._handler = handler;
  }

  *[Symbol.iterator]() {
    let err = null, it = this._source[Symbol.iterator]();
    while (1) {
      let c = <IteratorResult<TSource>>{};

      try {
        let c = it.next();
        if (c.done) { break; }
      } catch (e) {
        err = this._handler(e);
        break;
      }

      yield c.value;
    }

    if (err !== null) {
      for (let item of err) {
        yield item;
      }
    }    
  }
}

export function catchWith<TSource>(
    source: Iterable<TSource>,
    fn: (error: any) => Iterable<TSource>): IterableX<TSource> {
  return new CatchWithIterable<TSource>(source, fn);
}