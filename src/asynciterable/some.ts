import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';
import { FindOptions } from './findoptions.js';

/**
 * Determines whether any element of an async-iterable sequence satisfies a condition.
 *
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source An async-iterable sequence whose elements to apply the predicate to.
 * @param {FindOptions<T, S>} options The options which includes a required predicate, an optional
 * thisArg for binding, and an abort signal for cancellation.
 * @returns {Promise<boolean>} A promise with a boolean determining whether any elements in the source sequence
 * pass the test in the specified predicate.
 */
export async function some<T>(source: AsyncIterable<T>, options: FindOptions<T>): Promise<boolean> {
  const { ['signal']: signal, ['thisArg']: thisArg, ['predicate']: predicate } = options;

  throwIfAborted(signal);

  let i = 0;
  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i++, signal)) {
      return true;
    }
  }

  return false;
}
