import { OptionalFindOptions } from './findoptions';

/**
 * Returns the only element of an iterable sequence that matches the predicate if specified,
 * or undefined if no such element exists; this method reports an exception if there is more
 * than one element in the iterable sequence.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source Source iterable sequence.
 * @param {OptionalFindOptions<T>} [options] The optional options which includes a predicate for filtering,
 * and thisArg for predicate binding.
 * @returns {(T | undefined)} The single element in the iterable sequence that satisfies
 * the condition in the predicate, or undefined if no such element exists.
 */
export function single<T>(source: Iterable<T>, options?: OptionalFindOptions<T>): T | undefined {
  const { ['thisArg']: thisArg, ['predicate']: predicate = () => true } = options || {};
  let result: T | undefined;
  let hasResult = false;
  let i = 0;
  for (const item of source) {
    if (hasResult && predicate!.call(thisArg, item, i++)) {
      throw new Error('More than one element was found');
    }
    if (predicate!.call(thisArg, item, i++)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
