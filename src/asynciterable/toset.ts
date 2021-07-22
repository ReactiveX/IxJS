import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 * Converts the existing async-iterable into a promise which resolves a Set.
 *
 * @template TSource The type of elements in the source sequence.
 * @param {AsyncIterable<TSource>} source The async-iterable to convert into a set.
 * @param {AbortSignal} [signal] An optional abort signal to cancel the operation at any time.
 * @returns {Promise<Set<TSource>>} A promise which contains a Set with all the elements from the async-iterable.
 */
export async function toSet<TSource>(
  source: AsyncIterable<TSource>,
  signal?: AbortSignal
): Promise<Set<TSource>> {
  throwIfAborted(signal);
  const set = new Set<TSource>();
  for await (const item of wrapWithAbort(source, signal)) {
    set.add(item);
  }
  return set;
}
