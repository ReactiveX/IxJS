import { toArray } from './toarray';
export async function reduceRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: never[]
): Promise<R>;
export async function reduceRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: R
): Promise<R>;
export async function reduceRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  ...seed: R[]
): Promise<R> {
  const array = await toArray(source);
  const hasSeed = seed.length === 1;
  let hasValue = false;
  let acc = seed[0] as T | R;
  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];
    if (hasValue || (hasValue = hasSeed)) {
      acc = await accumulator(<R>acc, item, offset);
    } else {
      acc = item;
      hasValue = true;
    }
  }

  if (!(hasSeed || hasValue)) {
    throw new Error('Sequence contains no elements');
  }

  return acc as R;
}
