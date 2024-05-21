import { ReduceOptions } from './reduceoptions.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';

/**
 * Applies an accumulator function over an async-iterable sequence, returning the result of the aggregation as a
 * single element in the result sequence. The seed value, if specified, is used as the initial accumulator value.
 * For aggregation behavior with incremental intermediate results, scan.
 *
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result of the aggregation.
 * @param {AsyncIterable<T>} source An async-iterable sequence to aggregate over.
 * @param {ReduceOptions<T, R>} options The options which contains a callback, with optional seedn and an optional abort signal for cancellation.
 * @returns {Promise<R>} A promise with the final accumulator value.
 */
export async function reduce<T, R = T>(
  source: AsyncIterable<T>,
  options: ReduceOptions<T, R>
): Promise<R> {
  const { ['seed']: seed, ['signal']: signal, ['callback']: callback } = options;
  const hasSeed = options.hasOwnProperty('seed');
  throwIfAborted(signal);
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
