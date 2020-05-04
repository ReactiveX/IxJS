import { ExtremaByOptions, extremaBy } from './_extremaby';
import { equalityComparerAsync } from '../util/comparer';

/**
 * Returns the elements in an async-enumerable sequence with the minimum key value.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the key computed for each element in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to get the minimum elements for.
 * @param {((item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>)} selector Key selector function.
 * @param {ExtremaByOptions<TKey>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TSource[]>} A promise containing a list of zero or more elements that have a minimum key value.
 */
export async function minBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  selector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  options?: ExtremaByOptions<TKey>
): Promise<TSource[]> {
  const opts = options || ({} as ExtremaByOptions<TKey>);
  if (!opts.comparer) {
    opts.comparer = equalityComparerAsync;
  }
  opts.comparer = (key, minValue) => -opts.comparer!(key, minValue);
  return extremaBy(source, selector, opts);
}
