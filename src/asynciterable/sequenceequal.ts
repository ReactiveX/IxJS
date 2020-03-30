import { comparerAsync } from '../util/comparer';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 * Determines whether the two async-iterable sequences are equal.
 * @param source The first sequence to check for equality.
 * @param other The other sequence to check for equality.
 * @param comparer An optional comparer to compare the two sequences.
 * @param signal An optional abort signal to cancel the operation.
 */
export async function sequenceEqual<T>(
  source: AsyncIterable<T>,
  other: AsyncIterable<T>,
  comparer: (first: T, second: T) => boolean | Promise<boolean> = comparerAsync,
  signal?: AbortSignal
): Promise<boolean> {
  throwIfAborted(signal);
  const it1 = wrapWithAbort(source, signal)[Symbol.asyncIterator]();
  const it2 = wrapWithAbort(other, signal)[Symbol.asyncIterator]();
  let next1: IteratorResult<T>;
  let next2: IteratorResult<T>;
  while (!(next1 = await it1.next()).done) {
    if (!(!(next2 = await it2.next()).done && (await comparer(next1.value, next2.value)))) {
      return false;
    }
  }

  return !!(await it2.next()).done;
}
