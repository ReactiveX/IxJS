'use strict';

import { AsyncIterableX } from '../asynciterable';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

class UnionAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _left: AsyncIterable<TSource>;
  private _right: AsyncIterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean;

  constructor(left: AsyncIterable<TSource>, right: AsyncIterable<TSource>, comparer: (x: TSource, y: TSource) => boolean) {
    super();
    this._left = left;
    this._right = right;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator]() {
    let map = [];
    for await (let lItem of this._left) {
      if (arrayIndexOf(map, lItem, this._comparer) === -1) {
        map.push(lItem);
        yield lItem;
      }
    }

    for await (let rItem of this._right) {
      if (arrayIndexOf(map, rItem, this._comparer) === -1) {
        map.push(rItem);
        yield rItem;
      }
    }
  }
}

export function union<TSource>(
    left: AsyncIterable<TSource>,
    right: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean = defaultComparer): AsyncIterableX<TSource> {
  return new UnionAsyncIterable<TSource>(left, right, comparer);
}