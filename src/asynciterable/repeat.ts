'use strict';

export async function* repeat<TSource>(source: AsyncIterable<TSource>, count: number = -1): AsyncIterable<TSource> {
  if (count === -1) {
    while (1) {
      for await (let item of source) { yield item; }
    }
  } else {
    for (let i = 0; i < count; i++) {
      for await (let item of source) { yield item; }
    }
  }
}