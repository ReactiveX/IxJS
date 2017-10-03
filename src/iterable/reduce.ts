export function reduce<T>(source: Iterable<T>, accumulator: (acc: T, value: T, index: number) => T, seed?: T): T;
export function reduce<T>(source: Iterable<T>, accumulator: (acc: T[], value: T, index: number) => T[], seed?: T[]): T[];
export function reduce<T, R>(source: Iterable<T>, accumulator: (acc: R, value: T, index: number) => R, seed?: R): R;

export function reduce<T, R>(
      source: Iterable<T>,
      fn: (acc: R, x: T, index: number) => R,
      seed?: T | R): T | R {
  let _seed = seed;
  const hasSeed = arguments.length === 3;
  let i = 0, hasValue = false;
  for (let item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      _seed = fn(<R>_seed, item, i++);
    } else {
      _seed = item;
      hasValue = true;
      i++;
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
