'use strict';

import { IterableX } from '../iterable';

class RepeatIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    if (this._count === -1) {
      while (1) {
        yield* this._source;
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        yield* this._source;
      }
    }
  }
}

export function repeat<TSource>(source: Iterable<TSource>, count: number = -1): IterableX<TSource> {
  return new RepeatIterable<TSource>(source, count);
}