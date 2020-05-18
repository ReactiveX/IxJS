import { equalityComparerAsync } from '../util/comparer';
import { identityAsync } from '../util/identity';
import { ExtremaOptions } from './extremaoptions';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 *  * Returns the minimum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to determine the minimum element of.
 * @param {ExtremaOptions<TSource, TKey>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TSource>} A promise containing the minimum element.
 */
export async function min<TSource, TResult = TSource>(
  source: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): Promise<TResult> {
  const {
    ['comparer']: comparer = equalityComparerAsync,
    ['signal']: signal,
    ['selector']: selector = identityAsync,
  } = options || {};

  throwIfAborted(signal);

  const it = wrapWithAbort(source, signal)[Symbol.asyncIterator]();
  let next = await it.next();

  if (next.done) {
    throw new Error('Sequence contains no elements');
  }

  let minValue = await selector(next.value);

  while (!(next = await it.next()).done) {
    const current = await selector(next.value);
    if ((await comparer(current, minValue)) < 0) {
      minValue = current;
    }
  }

  return minValue;
}
