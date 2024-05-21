import { OptionalFindOptions } from './findoptions.js';

/**
 * Returns the last element of an iterable sequence that satisfies the condition in the predicate if given
 * otherwise the last item in the sequence, or a default value if no such element exists.
 *
 * @template T The type of elements in the source sequence.
 * @param {Iterable<T>} source The source iterable sequence.
 * @param {OptionalFindSubclassedOptions<T, S>} [options] The options which include an optional predicate for filtering,
 * thirArg for binding, and abort signal for cancellation
 * @returns {(S | undefined)} The last value that matches the optional predicate or last item, otherwise undefined.
 */
export function last<T>(source: Iterable<T>, options?: OptionalFindOptions<T>): T | undefined {
  const { ['thisArg']: thisArg, ['predicate']: predicate = () => true } = options || {};
  let i = 0;
  let result: T | undefined;
  for (const item of source) {
    if (predicate!.call(thisArg, item, i++)) {
      result = item;
    }
  }

  return result;
}
