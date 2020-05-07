import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { find } from '../../asynciterable/find';
import { FindSubclassedOptions, FindOptions } from '../../asynciterable/findoptions';

/**
 * @ignore
 */
export function findProto<T, S extends T>(
  this: AsyncIterable<T>,
  options: FindSubclassedOptions<T, S>
): Promise<S | undefined>;
/**
 * Returns the value of the first element in the provided async-iterable that satisfies the provided testing function.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source An async-iterable sequence whose elements to apply the predicate to.
 * @param {FindOptions<T>} options The options for a predicate for filtering, thisArg for binding and AbortSignal for cancellation.
 * @returns {(Promise<S | undefined>)} A promise with the value of the first element that matches the predicate.
 */
export async function findProto<T>(
  this: AsyncIterable<T>,
  options: FindOptions<T>
): Promise<T | undefined> {
  return find(this, options as any);
}

AsyncIterableX.prototype.find = findProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    find: typeof findProto;
  }
}
