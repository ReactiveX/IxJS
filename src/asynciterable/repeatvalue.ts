'use strict';

export async function* repeatValue<TSource>(value: TSource, count: number = -1): AsyncIterable<TSource> {
  if (count === -1) {
    while (1) {
      yield value;
    }
  } else {
    for (let i = 0; i < count; i++) {
      yield value;
    }
  }
}