'use strict';

import { IterableX } from '../iterable';

class SkipIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let next, it = this._source[Symbol.iterator]();
    for (let i = 0; i < this._count; i++) {
      next = it.next();
      if (next.done) { return; }
    }

    while (!(next = it.next()).done) {
      yield next.value;
    }
  }
}

export function skip<TSource>(source: Iterable<TSource>, count: number): IterableX<TSource> {
  return new SkipIterable<TSource>(source, count);
}