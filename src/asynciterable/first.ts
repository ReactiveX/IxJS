'use strict';

export async function first<T>(
    source: AsyncIterable<T>,
    fn: (value: T) => boolean = () => true): Promise<T | undefined> {
  for await (let item of source) {
    if (fn(item)) {
      return item;
    }
  }

  return undefined;
}