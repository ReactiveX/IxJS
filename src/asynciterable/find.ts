import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { FindOptions, FindSubclassedOptions } from './findoptions';

/**
 * Returns the value of the first element in the provided async-iterable that satisfies the provided testing function.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template S The return type from the predicate which is falsy or truthy.
 * @param {AsyncIterable<T>} source An async-iterable sequence whose elements to apply the predicate to.
 * @param {(value: T, index: number, signal?: AbortSignal) => value is S} predicate Function to evaluate for each element in the async-iterable.
 * @param {*} [thisArg] An optional object to use as this inside a callback.
 * @param {AbortSignal} [signal] The optional abort signal to be used for cancelling the sequence at any time.
 * @returns {(Promise<S | undefined>)} A promise with the value of the first element that matches the predicate.
 */
export async function find<T, S extends T>(
  source: AsyncIterable<T>,
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
export async function find<T>(
  source: AsyncIterable<T>,
  options: FindOptions<T>
): Promise<T | undefined> {
  const { signal, thisArg, predicate } = options;
  throwIfAborted(signal);
  let i = 0;

  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i++, signal)) {
      return item;
    }
  }
  return undefined;
}
