import { equalityComparer } from '../util/comparer';
import { reduce } from './reduce';

/**
 *  * Returns the minimum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {Iterable<TSource>} source An async-iterable sequence to determine the minimum element of.
 * @param {(left: TSource, right: TSource) => Promise<number>} [comparer=equalityComparer] Comparer used to compare elements.
 * @returns {TSource} The minimum element.
 */
export function min<TSource>(
  source: Iterable<TSource>,
  comparer: (left: TSource, right: TSource) => number = equalityComparer
): TSource {
  const minBy: (x: TSource, y: TSource) => TSource =
    typeof comparer === 'function'
      ? (x, y) => (comparer(x, y) < 0 ? x : y)
      : (x, y) => (x < y ? x : y);
  return reduce(source, {
    callback: minBy,
  });
}
