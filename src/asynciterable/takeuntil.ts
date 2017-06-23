'use strict';

import { AsyncIterableX } from '../asynciterable';

class TakeUntilAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _other: Promise<any>;

  constructor(source: AsyncIterable<TSource>, other: Promise<any>) {
    super();
    this._source = source;
    this._other = other;
  }

  async *[Symbol.asyncIterator]() {
    const it = this._source[Symbol.asyncIterator]();
    let otherDone = false, next;
    this._other.then(() => otherDone = true).catch(() => otherDone = true);
    while (!otherDone && !(next = await it.next()).done) {
      yield next.value;
    }
  }
}

export function takeUntil<TSource>(
    source: AsyncIterable<TSource>,
    other: Promise<any>): AsyncIterable<TSource> {
  return new TakeUntilAsyncIterable<TSource>(source, other);
}