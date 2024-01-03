import { equalityComparer } from '../util/comparer.js';
import { identity } from '../util/identity.js';
import { ExtremaOptions } from './extremaoptions.js';

/**
 * Returns the maximum element with the optional selector.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {Iterable<TSource>} source An async-iterable sequence to determine the maximum element of.
 * @param {ExtremaByOptions<TKey>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TResult>} The maximum element.
 */
export function max<TSource, TResult = TSource>(
  source: Iterable<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): TResult {
  const { ['comparer']: comparer = equalityComparer, ['selector']: selector = identity } =
    options || {};

  const it = source[Symbol.iterator]();
  let next = it.next();

  if (next.done) {
    throw new Error('Sequence contains no elements');
  }

  let maxValue = selector(next.value);

  while (!(next = it.next()).done) {
    const current = selector(next.value);
    if (comparer(current, maxValue) > 0) {
      maxValue = current;
    }
  }

  return maxValue;
}
