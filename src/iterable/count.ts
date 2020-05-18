import { OptionalFindOptions } from './findoptions';

/**
 * Returns a promise that represents how many elements in the specified iterable sequence satisfy a condition
 * otherwise, the number of items in the sequence.
 *
 * @export
 * @template T The type of elements in the source collection.
 * @param {Iterable<T>} source An iterable sequence that contains elements to be counted.
 * @param {OptionalFindOptions<T>} [options] The options for a predicate for filtering and thisArg for binding.
 * @returns {number} The number of matching elements for the given condition if provided, otherwise
 * the number of elements in the sequence.
 */
export function count<T>(source: Iterable<T>, options?: OptionalFindOptions<T>): number {
  const { ['thisArg']: thisArg, ['predicate']: predicate = () => true } = options || {};
  let i = 0;

  for (const item of source) {
    if (predicate.call(thisArg, item, i)) {
      i++;
    }
  }

  return i;
}
