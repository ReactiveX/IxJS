import { equalityComparerAsync } from '../util/comparer.js';
import { identityAsync } from '../util/identity.js';
import { ExtremaOptions } from './extremaoptions.js';
import { reduce } from './reduce.js';

/**
 * Returns the maximum element with the optional selector.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to determine the maximum element of.
 * @param {ExtremaOptions<TSource, TResult>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TResult>} The maximum element.
 */
export async function max<TSource, TResult = TSource>(
  source: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TResult>
): Promise<TResult> {
  const {
    ['comparer']: comparer = equalityComparerAsync,
    ['signal']: signal,
    ['selector']: selector = identityAsync,
  } = options || {};

  return reduce(source, {
    async ['callback'](maxValue, item) {
      const value = await selector(item);

      return (await comparer(value, maxValue)) > 0 ? value : maxValue;
    },
    ['signal']: signal,
  });
}
