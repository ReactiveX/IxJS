import { toArray } from './toarray.js';
import { ReduceOptions } from './reduceoptions.js';
import { throwIfAborted } from '../aborterror.js';

/**
 * Applies an accumulator function over an async-iterable sequence from the end, returning the result of the aggregation as a
 * single element in the result sequence. The seed value, if specified, is used as the initial accumulator value.
 * For aggregation behavior with incremental intermediate results, scan.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TResult The type of the result of the aggregation.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to aggregate over from the right.
 * @param {ReduceOptions<TSource, TResult>} options The options which contains a callback, with optional seed and an optional abort signal for cancellation.
 * @returns {Promise<TResult>} A promise with the final accumulator value.
 */
export async function reduceRight<TSource, TResult = TSource>(
  source: AsyncIterable<TSource>,
  options: ReduceOptions<TSource, TResult>
): Promise<TResult> {
  const { ['seed']: seed, ['signal']: signal, ['callback']: callback } = options;

  throwIfAborted(signal);

  const array = await toArray(source, signal);

  let hasValue = options.hasOwnProperty('seed');
  let acc = seed;

  for (let offset = array.length - 1; offset >= 0; offset--) {
    const item = array[offset];

    if (!hasValue) {
      acc = (item as unknown) as TResult;
      hasValue = true;
    } else {
      acc = await callback(acc as TResult, item, offset, signal);
    }
  }

  if (!hasValue) {
    throw new Error('Sequence contains no elements');
  }

  return acc as TResult;
}
