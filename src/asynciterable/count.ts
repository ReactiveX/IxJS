import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { OptionalFindOptions } from './findoptions';

/**
 * Returns a promise that represents how many elements in the specified async-iterable sequence satisfy a condition
 * otherwise, the number of items in the sequence.
 *
 * @template T The type of elements in the source collection.
 * @param {AsyncIterable<T>} source An async-iterable sequence that contains elements to be counted.
 * @param {OptionalFindOptions<T>} [options] The options for a predicate for filtering, thisArg for binding and AbortSignal for cancellation.
 * @returns {Promise<number>} The number of matching elements for the given condition if provided, otherwise
 * the number of elements in the sequence.
 */
export async function count<T>(
  source: AsyncIterable<T>,
  options?: OptionalFindOptions<T>
): Promise<number> {
  const { ['signal']: signal, ['thisArg']: thisArg, ['predicate']: predicate = async () => true } =
    options || {};
  throwIfAborted(signal);
  let i = 0;

  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i, signal)) {
      i++;
    }
  }

  return i;
}
