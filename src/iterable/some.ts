import { FindOptions } from './findoptions';

/**
 * Determines whether any element of an iterable sequence satisfies a condition.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {Iterable<T>} source An iterable sequence whose elements to apply the predicate to.
 * @param {FindSubclassedOptions<T, S>} options The options which includes a required predicate, an optional
 * thisArg for binding, and an abort signal for cancellation.
 * @returns {boolean} Returns a boolean determining whether any elements in the source sequence
 * pass the test in the specified predicate.
 */
export function some<T>(source: Iterable<T>, options: FindOptions<T>): boolean {
  const { ['thisArg']: thisArg, ['predicate']: predicate } = options;
  let i = 0;
  for (const item of source) {
    if (predicate.call(thisArg, item, i++)) {
      return true;
    }
  }
  return false;
}
