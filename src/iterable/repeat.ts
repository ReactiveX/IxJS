'use strict';

export function* repeat<TSource>(source: Iterable<TSource>, count: number = -1): Iterable<TSource> {
  if (count === -1) {
    while (1) {
      yield* source;
    }
  } else {
    for (let i = 0; i < count; i++) {
      yield* source;
    }
  }
}