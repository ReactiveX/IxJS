import { extremaBy } from './_extremaby';
import { ExtremaOptions } from './extremaoptions';
import { equalityComparerAsync } from '../util/comparer';
import { identityAsync } from '../util/identity';

/**
 * Returns the elements in an async-enumerable sequence with the minimum key value.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the key computed for each element in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to get the minimum elements for.
 * @param {ExtremaOptions<TSource, TKey>} options The options which include an optional comparer and abort signal.
 * @returns {Promise<TSource[]>} A promise containing a list of zero or more elements that have a minimum key value.
 */
export async function minBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TKey>
): Promise<TSource[]> {
  const {
    ['comparer']: comparer = equalityComparerAsync,
    ['selector']: selector = identityAsync,
    ['signal']: signal,
  } = options || {};
  const newComparer = (key: TKey, minValue: TKey) => -comparer!(key, minValue);
  return extremaBy(source, selector, newComparer, signal);
}
