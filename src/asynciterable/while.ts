'use strict';

export async function* _while<T>(
    source: AsyncIterable<T>,
    condition: () => boolean): AsyncIterable<T> {
  while (condition()) {
    for await (let item of source) { yield item; }
  }
}