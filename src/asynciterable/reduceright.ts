import { toArray } from './toarray';

export async function reduceRight<T>(
  source: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>): Promise<T>;
export async function reduceRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R): Promise<R>;
export async function reduceRight<T, R = T>(
    source: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
    ...args: (T | R)[]): Promise<T | R> {
  let [seed] = args;
  const hasSeed = args.length === 1;
  let hasValue = false;
  const array = await toArray(source);
  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];
    if (hasValue || (hasValue = hasSeed)) {
      seed = await accumulator(seed, item, offset);
    } else {
      seed = item;
      hasValue = true;
    }
  }

  if (hasSeed && !hasValue) {
    return seed!;
  }

  if (!hasValue) {
    throw new Error('Sequence contains no elements');
  }

  return seed!;
}
