import { OptionalFindOptions, OptionalFindSubclassedOptions } from './findoptions';

/**
 * Returns the first element of an iterable sequence that matches the predicate if provided, or undefined if no such element exists.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template S The return type from the predicate which is falsy or truthy.
 * @param {Iterable<T>} source Source async-enumerable sequence.
 * @returns {(S | undefined)} The first element in the iterable sequence, or undefined if no such element exists.
 */
export function first<T, S extends T>(
  source: Iterable<T>,
  options?: OptionalFindSubclassedOptions<T, S>
): S | undefined;
/**
 * Returns the first element of an iterable sequence that matches the predicate if provided, or undefined if no such element exists.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {Iterable<T>} source Source async-enumerable sequence.
 * @returns {(S | undefined)} The first element in the iterable sequence, or undefined if no such element exists.
 */
export function first<T>(source: Iterable<T>, options?: OptionalFindOptions<T>): T | undefined {
  const opts = options || ({} as OptionalFindOptions<T>);
  if (!opts.predicate) {
    opts.predicate = () => true;
  }
  const { ['thisArg']: thisArg, ['predicate']: predicate } = opts;
  let i = 0;
  for (const item of source) {
    if (predicate!.call(thisArg, item, i++)) {
      return item;
    }
  }

  return undefined;
}
