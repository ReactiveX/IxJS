import { extremaBy } from './_extremaby';
import { ExtremaOptions } from './extremaoptions';
import { equalityComparerAsync } from '../util/comparer';
import { identityAsync } from '../util/identity';

/**
 * Returns the elements in an async-iterable sequence with the maximum key value.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the key computed for each element in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to get the maximum elements for.
 * @param {ExtremaOptions<TSource, TKey>} [options] The options which include an optional comparer and abort signal.
 * @returns {Promise<TSource[]>} A promise containing a list of zero or more elements that have a maximum key value.
 */
export async function maxBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  options?: ExtremaOptions<TSource, TKey>
): Promise<TSource[]> {
  const opts = options || ({} as ExtremaOptions<TSource, TKey>);
  if (!opts.comparer) {
    opts.comparer = equalityComparerAsync;
  }
  if (!opts.selector) {
    opts.selector = identityAsync;
  }
  return extremaBy(source, opts);
}
