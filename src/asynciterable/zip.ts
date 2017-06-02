'use strict';

import { AsyncIterableX } from '../asynciterable';

class ZipIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _left: AsyncIterable<TSource>;
  private _right: AsyncIterable<TSource>;
  private _fn: (left: TSource, right: TSource) => TResult | Promise<TResult>;

  constructor(
      left: AsyncIterable<TSource>,
      right: AsyncIterable<TSource>,
      fn: (left: TSource, right: TSource) => TResult | Promise<TResult>) {
    super();
    this._left = left;
    this._right = right;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator]() {
    const it1 = this._left[Symbol.asyncIterator]();
    const it2 = this._right[Symbol.asyncIterator]();
    let next1, next2;
    while (!(next1 = await it1.next()).done && (!(next2 = await it2.next()).done)) {
      yield await this._fn(next1.value, next2.value);
    }
  }
}

export function zip<TSource, TResult>(
    left: AsyncIterable<TSource>,
    right: AsyncIterable<TSource>,
    fn: (left: TSource, right: TSource) => TResult | Promise<TResult>): AsyncIterableX<TResult> {
  return new ZipIterable<TSource, TResult>(left, right, fn);
}