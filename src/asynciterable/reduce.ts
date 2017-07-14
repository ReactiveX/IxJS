export async function reduce<T>(
  source: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>): Promise<T>;
export async function reduce<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R): Promise<R>;
export async function reduce<T, R = T>(
    source: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
    ...args: (T | R)[]): Promise<T | R> {
  let [seed] = args;
  const hasSeed = args.length === 1;
  let i = 0, hasValue = false;
  for await (let item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      seed = await accumulator(seed, item, i++);
    } else {
      seed = item;
      hasValue = true;
      i++;
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
