'use strict';

export async function single<T>(source: AsyncIterable<T>, fn: (value: T) => boolean = () => true): Promise<T | undefined> {
  let result: T | undefined;
  let hasResult = true;
  for await (let item of source) {
    if (hasResult && fn(item)) {
      throw new Error('More than one element was found');
    }
    if (fn(item)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}