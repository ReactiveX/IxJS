'use strict';

export async function* _finally<TSource>(
    source: AsyncIterable<TSource>,
    action: () => void): AsyncIterable<TSource> {
  try {
    yield* source;
  } finally {
    action();
  }
}