'use strict';

export function* _finally<TSource>(
    source: Iterable<TSource>,
    action: () => void) {
  try {
    yield* source;
  } finally {
    action();
  }
}