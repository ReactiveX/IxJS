'use strict';

export function* defer<TSource>(fn: () => Iterable<TSource>): Iterable<TSource> {
  for (let item of fn()) {
    yield item;
  }
}