'use strict';

import { IterableX } from '../iterable';

class SkipWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let it = this._source[Symbol.iterator](), i = 0, next;
    while (!(next = it.next()).done) {
      if (!this._predicate(next.value, i++)) {
        yield next.value;
        while (!(next = it.next()).done) {
          yield next.value;
        }
      }
    }
  }
}

export function skipWhile<TSource>(
    source: Iterable<TSource>,
    predicate: (value: TSource, index: number) => boolean): IterableX<TSource> {
  return new SkipWhileIterable<TSource>(source, predicate);
}