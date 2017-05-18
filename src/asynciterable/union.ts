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
    let it, leftDone = false, rightDone = false, map = [];
    while (1) {
      if (!it) {
        if (rightDone) {
          break;
        }

        if (!leftDone) {
          it = this._left[Symbol.asyncIterator]();
          leftDone = true;
        } else {
          it = this._right[Symbol.asyncIterator]();
          rightDone = true;
        }
      }

      let next = await it.next();
      if (next.done) {
        it = null;
      } else {
        let current = next.value;
        if (arrayIndexOf(map, current, this._comparer) !== -1) {
          map.push(current);
          yield current;
        }
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