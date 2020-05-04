import { ExtremaByOptions, extremaBy } from './_extremaby';
import { equalityComparerAsync } from '../util/comparer';

/**
 * Returns the elements in an terable sequence with the minimum key value.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the key computed for each element in the source sequence.
 * @param {Iterable<TSource>} source An async-iterable sequence to get the minimum elements for.
 * @param {((item: TSource, signal?: AbortSignal) => TKey)} selector Key selector function.
 * @param {ExtremaByOptions<TKey>} [options] The options which include an optional comparer.
 * @returns {TSource[]} A list of zero or more elements that have a minimum key value.
 */
export function minBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  selector: (item: TSource, signal?: AbortSignal) => TKey,
  options?: ExtremaByOptions<TKey>
): TSource[] {
  const opts = options || ({} as ExtremaByOptions<TKey>);
  if (!opts.comparer) {
    opts.comparer = equalityComparerAsync;
  }
  opts.comparer = (key, minValue) => -opts.comparer!(key, minValue);
  return extremaBy(source, selector, opts);
}
