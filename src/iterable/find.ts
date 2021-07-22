import { FindOptions } from './findoptions';

/**
 * Returns the value of the first element in the provided iterable that satisfies the provided testing function.
 *
 * @template T The type of the elements in the source sequence.
 * @param {Iterable<T>} source An iterable sequence whose elements to apply the predicate to.
 * @param {FindOptions<T>} options The options for a predicate for filtering, thisArg for binding and AbortSignal for cancellation.
 * @returns {(T | undefined)} The first element that matches the predicate.
 */
export function find<T>(source: Iterable<T>, options: FindOptions<T>): T | undefined {
  const { ['thisArg']: thisArg, ['predicate']: predicate } = options;
  let i = 0;

  for (const item of source) {
    if (predicate.call(thisArg, item, i++)) {
      return item;
    }
  }
  return undefined;
}
