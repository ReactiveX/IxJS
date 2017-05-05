'use strict';

export async function* defer<TSource>(fn: () => AsyncIterable<TSource>): AsyncIterable<TSource> {
  yield* fn();
}