import { equalityComparerAsync } from '../util/comparer.js';
import { identityAsync } from '../util/identity.js';
import { ExtremaOptions } from './extremaoptions.js';
import { reduce } from './reduce.js';

/**
 * Returns the minimum element with the optional selector.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to determine the minimum element of.
 * @param {ExtremaOptions<TSource, TResult>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TResult>} A promise containing the minimum element.
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

  return reduce(source, {
    async ['callback'](minValue, item) {
      const value = await selector(item);

      return (await comparer(value, minValue)) < 0 ? value : minValue;
    },
    ['signal']: signal,
  });
}
