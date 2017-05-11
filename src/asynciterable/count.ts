'use strict';

export async function count<T>(
    source: AsyncIterable<T>,
    fn: (value: T) => boolean = () => true): Promise<number> {
  let i = 0;

  for await (let item of source) {
    if (fn(item)) {
      i++;
    }
  }

  return i;
}