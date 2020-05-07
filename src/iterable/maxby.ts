import { ExtremaByOptions, extremaBy } from './_extremaby';
import { equalityComparerAsync } from '../util/comparer';

/**
 * Returns the elements in an iterable sequence with the maximum key value.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the key computed for each element in the source sequence.
 * @param {Iterable<TSource>} source The source to get the maximum by.
 * @param {((item: TSource) => TKey)} selector An async-iterable sequence to get the maximum elements for.
 * @param {ExtremaByOptions<TKey>} [options] The options which include an optional comparer.
 * @returns {TSource[]} A list of zero or more elements that have a maximum key value.
 */
export function maxBy<TSource, TKey>(
  source: Iterable<TSource>,
  selector: (item: TSource) => TKey,
  options?: ExtremaByOptions<TKey>
): TSource[] {
  const opts = options || ({} as ExtremaByOptions<TKey>);
  if (!opts.comparer) {
    opts.comparer = equalityComparerAsync;
  }
  return extremaBy(source, selector, opts);
}
