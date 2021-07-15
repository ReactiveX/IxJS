import { extremaBy } from './_extremaby';
import { ExtremaOptions } from './extremaoptions';
import { equalityComparer } from '../util/comparer';

/**
 * Returns the elements in an terable sequence with the minimum key value.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the key computed for each element in the source sequence.
 * @param {Iterable<TSource>} source An async-iterable sequence to get the minimum elements for.
 * @param {ExtremaOptions<TSource, TKey>} [options] The options which include an optional comparer.
 * @returns {TSource[]} A list of zero or more elements that have a minimum key value.
 */
export function minBy<TSource, TKey>(
  source: Iterable<TSource>,
  options?: ExtremaOptions<TSource, TKey>
): TSource[] {
  const { ['comparer']: comparer = equalityComparer, ['selector']: selector } = options || {};
  const newComparer = (key: TKey, minValue: TKey) => -comparer(key, minValue);
  return extremaBy(source, selector!, newComparer);
}
