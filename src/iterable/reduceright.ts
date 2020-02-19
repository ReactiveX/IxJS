import { toArray } from './toarray';
export function reduceRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): R;
export function reduceRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): R;
export function reduceRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): R {
  const array = toArray(source);
  const hasSeed = seed.length === 1;
  let hasValue = false;
  let acc = seed[0] as T | R;
  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];
    if (hasValue || (hasValue = hasSeed)) {
      acc = accumulator(<R>acc, item, offset);
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
