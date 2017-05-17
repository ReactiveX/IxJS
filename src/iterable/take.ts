'use strict';

import { IterableX } from '../iterable';

class TakeIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let i = this._count;
    for (let item of this._source) {
      if (i-- === 0) { break; }
      yield item;
    }
  }
}

export function take<TSource>(source: Iterable<TSource>, count: number): IterableX<TSource> {
  return new TakeIterable<TSource>(source, count);
}