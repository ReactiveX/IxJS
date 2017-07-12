import { toArray } from './toarray';

export function reduceRight<T>(
    source: Iterable<T>,
    accumulator: (acc: T, value: T, index: number) => T,
    seed?: T): T;
export function reduceRight<T>(
    source: Iterable<T>,
    accumulator: (acc: T[], value: T, index: number) => T[],
    seed?: T[]): T[];
export function reduceRight<T, R>(
    source: Iterable<T>,
    accumulator: (acc: R, value: T, index: number) => R,
    seed?: R): R;

export function reduceRight<T, R>(
    source: Iterable<T>,
    fn: (acc: R, x: T, index: number) => R,
    seed?: T | R): T | R {
  const hasSeed = arguments.length === 3;
  let hasValue = false;
  const array = toArray(source);
  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];
    if (hasValue || (hasValue = hasSeed)) {
      seed = fn(<R>seed, item, offset);
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
