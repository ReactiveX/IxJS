import { ReduceOptions } from './reduceoptions';

export function reduce<T, R = T>(source: Iterable<T>, options: ReduceOptions<T, R>): R {
  const { ['seed']: seed, ['callback']: callback } = options;
  const hasSeed = options.hasOwnProperty('seed');
  let i = 0;
  let hasValue = false;
  let acc = seed as T | R;
  for (const item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      acc = callback(<R>acc, item, i++);
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
