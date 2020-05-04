import { ReduceOptions } from './reduceoptions';

/**
 * Applies an accumulator function over an iterable sequence, returning the result of the aggregation as a
 * single element in the result sequence. The seed value, if specified, is used as the initial accumulator value.
 * For aggregation behavior with incremental intermediate results, scan.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result of the aggregation.
 * @param {Iterable<T>} source An iterable sequence to aggregate over.
 * @param {ReduceOptions<T, R>} options The options which contains a callback and optional seed.
 * @returns {R} The final accumulator value.
 */
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
