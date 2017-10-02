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
  let _seed = seed;
  const hasSeed = arguments.length === 3;
  let hasValue = false;
  const array = toArray(source);
  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];
    if (hasValue || (hasValue = hasSeed)) {
      _seed = fn(<R>_seed, item, offset);
    } else {
      _seed = item;
      hasValue = true;
    }
  }

  if (hasSeed && !hasValue) {
    return _seed!;
  }

  if (!hasValue) {
    throw new Error('Sequence contains no elements');
  }

  return _seed!;
}
