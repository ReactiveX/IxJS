export function reduce<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): R;
export function reduce<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): R;
export function reduce<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): R {
  const hasSeed = seed.length === 1;
  let i = 0,
    hasValue = false,
    acc = seed[0] as T | R;
  for (let item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      acc = accumulator(<R>acc, item, i++);
    } else {
      acc = item;
      hasValue = true;
      i++;
    }
  }

  if (!(hasSeed || hasValue)) {
    throw new Error('Sequence contains no elements');
  }

  return acc as R;
}
