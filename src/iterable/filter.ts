'use strict';

import { IterableX } from '../iterable';
import { bindCallback } from '../internal/bindcallback';

class FilterIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (let item of this._source) {
      if (this._predicate(item, i++)) {
        yield item;
      }
    }
  }
}

export function filter<T>(
    source: Iterable<T>,
    predicate: (value: T, index: number) => boolean,
    thisArg?: any): IterableX<T> {
  return new FilterIterable<T>(source, bindCallback(predicate, thisArg, 2));
}