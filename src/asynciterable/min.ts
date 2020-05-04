import { equalityComparerAsync } from '../util/comparer';
import { reduce } from './reduce';

/**
 *  * Returns the minimum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to determine the minimum element of.
 * @param {(left: TSource, right: TSource) => Promise<number>} [comparer=equalityComparerAsync] Comparer used to compare elements.
 * @param {AbortSignal} [signal] An optional abort signal to cancel the operation at any time.
 * @returns {Promise<TSource>} A promise containing the minimum element.
 */
export async function min<TSource>(
  source: AsyncIterable<TSource>,
  comparer: (left: TSource, right: TSource) => Promise<number> = equalityComparerAsync,
  signal?: AbortSignal
): Promise<TSource> {
  const minBy: (x: TSource, y: TSource) => Promise<TSource> | TSource =
    typeof comparer === 'function'
      ? async (x, y) => ((await comparer(x, y)) < 0 ? x : y)
      : async (x, y) => (x < y ? x : y);
  return reduce(source, {
    callback: minBy,
    signal: signal,
  });
}
