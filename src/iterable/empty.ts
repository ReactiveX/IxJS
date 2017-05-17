'use strict';

import { IterableX } from '../iterable';

class EmptyIterable<TSource> extends IterableX<TSource> {
  *[Symbol.iterator](): Iterator<TSource> {
    // tslint:disable-next-line:no-empty
  }
}


export function empty<TSource>(): IterableX<TSource> {
  return new EmptyIterable<TSource>();
}