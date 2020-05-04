import { equalityComparerAsync } from '../util/comparer';
import { reduce } from './reduce';

/**
 * Returns the maximum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source An async-iterable sequence to determine the maximum element of.
 * @param {(left: TSource, right: TSource) => Promise<number>} [comparer=equalityComparerAsync] Comparer used to compare elements.
 * @param {AbortSignal} [signal]
 * @returns {Promise<TSource>}
 */
export async function max<TSource>(
  source: AsyncIterable<TSource>,
  comparer: (left: TSource, right: TSource) => Promise<number> = equalityComparerAsync,
  signal?: AbortSignal
): Promise<TSource> {
  const maxBy: (x: TSource, y: TSource) => Promise<TSource> | TSource =
    typeof comparer === 'function'
      ? async (x, y) => ((await comparer(x, y)) > 0 ? x : y)
      : async (x, y) => (x > y ? x : y);

  return reduce(source, {
    callback: maxBy,
    signal: signal,
  });
}
