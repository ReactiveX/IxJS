import { toArray } from './toarray';
import { ReduceOptions } from './reduceoptions';

export function reduceRight<T, R = T>(source: Iterable<T>, options: ReduceOptions<T, R>): R {
  const { ['seed']: seed, ['callback']: callback } = options;
  const hasSeed = options.hasOwnProperty('seed');
  const array = toArray(source);
  let hasValue = false;
  let acc = seed as T | R;
  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];
    if (hasValue || (hasValue = hasSeed)) {
      acc = callback(<R>acc, item, offset);
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
