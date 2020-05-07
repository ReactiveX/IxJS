import { comparerAsync } from '../util/comparer';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 * The options for sequence equal operations including a comparer and abort signal
 *
 * @interface SequencEqualOptions
 * @template T The type of items to compare.
 */
export interface SequencEqualOptions<T> {
  /**
   * The comparer function which returns true if the items are equal, false otherwise.
   *
   * @memberof SequencEqualOptions
   */
  comparer?: (first: T, second: T) => boolean | Promise<boolean>;
  /**
   * An optional abort signal to cancel the operation at any time.
   *
   * @type {AbortSignal}
   * @memberof SequencEqualOptions
   */
  signal?: AbortSignal;
}

/**
 * Determines whether two sequences are equal by comparing the elements pairwise.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @param {AsyncIterable<T>} source First async-iterable sequence to compare.
 * @param {AsyncIterable<T>} other Second async-iterable sequence to compare.
 * @param {SequencEqualOptions<T>} [options] The sequence equal options which include an optional comparer and optional abort signal.
 * @returns {Promise<boolean>} A promise which indicates whether both sequences are of equal length and their
 * corresponding elements are equal.
 */
export async function sequenceEqual<T>(
  source: AsyncIterable<T>,
  other: AsyncIterable<T>,
  options?: SequencEqualOptions<T>
): Promise<boolean> {
  const opts = options || ({} as SequencEqualOptions<T>);
  if (!opts.comparer) {
    opts.comparer = comparerAsync;
  }
  const { ['signal']: signal, ['comparer']: comparer } = opts;
  throwIfAborted(signal);
  const it1 = wrapWithAbort(source, signal)[Symbol.asyncIterator]();
  const it2 = wrapWithAbort(other, signal)[Symbol.asyncIterator]();
  let next1: IteratorResult<T>;
  let next2: IteratorResult<T>;
  while (!(next1 = await it1.next()).done) {
    if (!(!(next2 = await it2.next()).done && (await comparer!(next1.value, next2.value)))) {
      return false;
    }
  }

  return !!(await it2.next()).done;
}
