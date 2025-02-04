import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';
import { FindOptions } from './findoptions.js';

/**
 * Returns the value of the first element in the provided async-iterable that satisfies the provided testing function.
 *
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source An async-iterable sequence whose elements to apply the predicate to.
 * @param {FindOptions<T>} options The options for a predicate for filtering, thisArg for binding and AbortSignal for cancellation.
 * @returns {(Promise<S | undefined>)} A promise with the value of the first element that matches the predicate.
 */
export async function find<T>(
  source: AsyncIterable<T>,
  options: FindOptions<T>
): Promise<T | undefined> {
  const { ['signal']: signal, ['thisArg']: thisArg, ['predicate']: predicate } = options;

  throwIfAborted(signal);

  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i++, signal)) {
      return item;
    }
  }

  return undefined;
}
