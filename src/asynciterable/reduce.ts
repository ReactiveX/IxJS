import { ReduceOptions } from './reduceoptions';
import { wrapWithAbort } from './operators/withabort';

export async function reduce<T, R = T>(
  source: AsyncIterable<T>,
  options: ReduceOptions<T, R>
): Promise<R> {
  const { ['seed']: seed, ['signal']: signal, ['callback']: callback } = options;
  const hasSeed = options.hasOwnProperty('seed');
  let i = 0;
  let hasValue = false;
  let acc = seed as T | R;
  for await (const item of wrapWithAbort(source, signal)) {
    if (hasValue || (hasValue = hasSeed)) {
      acc = await callback(<R>acc, item, i++, signal);
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
