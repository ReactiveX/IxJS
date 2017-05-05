'use strict';

export function scan<T>(
  source: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T): AsyncIterable<T>;
export function scan<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R): AsyncIterable<R>;
export async function* scan<T, R = T>(
    source: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R,
    ...args: (T | R)[]): AsyncIterable<T | R> {
  let [seed] = args;
  const hasSeed = args.length === 1;
  let i = 0, hasValue = false;
  for await (let item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      seed = accumulator(seed, item, i++);
      yield seed;
    } else {
      seed = item;
      hasValue = true;
      i++;
    }
  }
}