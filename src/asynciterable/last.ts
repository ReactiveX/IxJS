'use strict';

export async function last<T>(
    source: AsyncIterable<T>,
    fn: (value: T) => boolean = () => true): Promise<T | undefined> {
  let result: T | undefined;
  for await (let item of source) {
    if (fn(item)) {
      result = item;
    }
  }

  return result;
}