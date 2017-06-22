'use strict';

import { IterableX } from '../iterable';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

class ExceptIterable<TSource> extends IterableX<TSource> {
  private _first: Iterable<TSource>;
  private _second: Iterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean;

  constructor(first: Iterable<TSource>, second: Iterable<TSource>, comparer: (x: TSource, y: TSource) => boolean) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
  }

  *[Symbol.iterator]() {
    let map = [];
    for (let secondItem of this._second) {
      map.push(secondItem);
    }

    for (let firstItem of this._first) {
      if (arrayIndexOf(map, firstItem, this._comparer) === -1) {
        map.push(firstItem);
        yield firstItem;
      }
    }
  }
}

/**
 * 
 * @param first 
 * @param second 
 * @param comparer 
 */
export function except<TSource>(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean = defaultComparer): IterableX<TSource> {
  return new ExceptIterable<TSource>(first, second, comparer);
}