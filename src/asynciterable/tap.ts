'use strict';

import { AsyncIterableX } from '../asynciterable';
import { PartialObserver } from '../observer';

class TapAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _observer: PartialObserver<TSource>;

  constructor(source: AsyncIterable<TSource>, observer: PartialObserver<TSource>) {
    super();
    this._source = source;
    this._observer = observer;
  }

  async *[Symbol.asyncIterator]() {
    const it = this._source[Symbol.asyncIterator]();
    while (1) {
      let next;
      try {
        next = await it.next();
      } catch (e) {
        if (this._observer.error) { this._observer.error(e); }
        throw e;
      }

      if (next.done) {
        if (this._observer.complete) { this._observer.complete(); }
        break;
      }

      if (this._observer.next) { this._observer.next(next.value); }
      yield next.value;
    }
  }
}

export function tap<TSource>(source: AsyncIterable<TSource>, observer: PartialObserver<TSource>): AsyncIterableX<TSource> {
  return new TapAsyncIterable<TSource>(source, observer);
}