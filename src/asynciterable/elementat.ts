import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';

/**
 * Returns the element at a specified index in a sequence or undefined if the index is out of range.
 *
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source async-iterable sequence to return the element from.
 * @param {number} index The zero-based index of the element to retrieve.
 * @param {AbortSignal} [signal] The optional abort signal to be used for cancelling the sequence at any time.
 * @returns {(Promise<T | undefined>)} An async-iterable sequence that produces the element at the specified
 * position in the source sequence, or undefined if the index is outside the bounds of the source sequence.
 */
export async function elementAt<T>(
  source: AsyncIterable<T>,
  index: number,
  signal?: AbortSignal
): Promise<T | undefined> {
  throwIfAborted(signal);
  let i = index;
  for await (const item of wrapWithAbort(source, signal)) {
    if (i === 0) {
      return item;
    }
    i--;
  }
  return undefined;
}
