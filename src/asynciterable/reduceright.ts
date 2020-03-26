import { toArray } from './toarray';
import { ReduceOptions } from './reduceoptions';

export async function reduceRight<T, R = T>(
  source: AsyncIterable<T>,
  options: ReduceOptions<T, R>
): Promise<R> {
  const { ['seed']: seed, ['signal']: signal, ['callback']: callback } = options;
  const hasSeed = options.hasOwnProperty('seed');
  const array = await toArray(source, signal);
  let hasValue = false;
  let acc = seed as T | R;
  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];
    if (hasValue || (hasValue = hasSeed)) {
      acc = await callback(<R>acc, item, offset, signal);
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
