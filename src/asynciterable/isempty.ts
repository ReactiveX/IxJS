import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';

/**
 * Determines whether the given async-iterable is empty.
 *
 * @template T The type of elements in the source sequence.
 * @param {AsyncIterable<T>} source The source async-iterable to determine whether it is empty.
 * @param {AbortSignal} [signal] An optional abort signal to cancel the operation.
 * @returns {Promise<boolean>} Returns a promise containing true if the sequence is empty, otherwise false.
 */
export async function isEmpty<T>(source: AsyncIterable<T>, signal?: AbortSignal): Promise<boolean> {
  throwIfAborted(signal);

  for await (const _ of wrapWithAbort(source, signal)) {
    return false;
  }

  return true;
}
