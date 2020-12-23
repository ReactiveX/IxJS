import { toArray } from './toarray';
import { ReduceOptions } from './reduceoptions';

/**
 * Applies an accumulator function over an iterable sequence from the right, returning the result of the aggregation as a
 * single element in the result sequence. The seed value, if specified, is used as the initial accumulator value.
 * For aggregation behavior with incremental intermediate results, scan.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result of the aggregation.
 * @param {Iterable<T>} source An iterable sequence to aggregate over.
 * @param {ReduceOptions<T, R>} options The options which contains a callback and optional seed.
 * @returns {R} The final accumulator value calculated from the right.
 */
export function reduceRight<T, R = T>(source: Iterable<T>, options: ReduceOptions<T, R>): R;
export function reduceRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (accumulator: R, current: T, index: number) => R,
  seed?: R
): R;
export function reduceRight<T, R = T>(
  source: Iterable<T>,
  optionsOrAccumulator: ReduceOptions<T, R> | ((accumulator: R, current: T, index: number) => R),
  seed?: R
): R {
  const options =
    // eslint-disable-next-line no-nested-ternary
    typeof optionsOrAccumulator === 'function'
      ? arguments.length > 2
        ? { 'callback': optionsOrAccumulator, 'seed': seed }
        : { 'callback': optionsOrAccumulator }
      : optionsOrAccumulator;
  const { ['seed']: _seed, ['callback']: callback } = options;
  const hasSeed = options.hasOwnProperty('seed');
  const array = toArray(source);
  let hasValue = false;
  let acc = _seed as T | R;
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
