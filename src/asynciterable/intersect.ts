'use strict';

import { AsyncIterableX } from '../asynciterable';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

function arrayRemove<T>(array: T[], item: T, comparer: (x: T, y: T) => boolean): boolean {
  let idx = arrayIndexOf(array, item, comparer);
  if (idx === -1) { return false; }
  array.splice(idx, 1);
  return true;
}

class IntersectAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _first: AsyncIterable<TSource>;
  private _second: AsyncIterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean;

  constructor(
      first: AsyncIterable<TSource>,
      second: AsyncIterable<TSource>,
      comparer: (x: TSource, y: TSource) => boolean) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator]() {
    let map = [];
    for await (let secondItem of this._second) {
      map.push(secondItem);
    }

    for await (let firstItem of this._first) {
      if (arrayRemove(map, firstItem, this._comparer)) {
        yield firstItem;
      }
    }
  }
}

export function intersect<TSource>(
      first: AsyncIterable<TSource>,
      second: AsyncIterable<TSource>,
      comparer: (x: TSource, y: TSource) => boolean = defaultComparer): AsyncIterableX<TSource> {
  return new IntersectAsyncIterable<TSource>(first, second, comparer);
}