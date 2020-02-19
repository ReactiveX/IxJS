export async function reduce<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: never[]
): Promise<R>;
export async function reduce<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: R
): Promise<R>;
export async function reduce<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  ...seed: R[]
): Promise<R> {
  const hasSeed = seed.length === 1;
  let i = 0;
  let hasValue = false;
  let acc = seed[0] as T | R;
  for await (const item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      acc = await accumulator(<R>acc, item, i++);
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
