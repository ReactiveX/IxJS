'use strict';

export async function* _while<T>(
    condition: () => boolean,
    source: AsyncIterable<T>,): AsyncIterable<T> {
  while (condition()) {
    for await (let item of source) { yield item; }
  }
}