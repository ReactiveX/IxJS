'use strict';

export function* defer<TSource>(fn: () => Iterable<TSource>): Iterable<TSource> {
  yield* fn();
}