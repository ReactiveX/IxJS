import { equalityComparer } from '../util/comparer';
import { reduce } from './reduce';

/**
 * Returns the maximum element with the optional selector.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @param {Iterable<TSource>} source An async-iterable sequence to determine the maximum element of.
 * @param {(left: TSource, right: TSource) => number} [comparer=equalityComparer] Comparer used to compare elements.
 * @returns {TSource} The maximum element.
 */
export function max<TSource>(
  source: Iterable<TSource>,
  comparer: (left: TSource, right: TSource) => number = equalityComparer
): TSource {
  const maxBy: (x: TSource, y: TSource) => TSource =
    typeof comparer === 'function'
      ? (x, y) => (comparer(x, y) > 0 ? x : y)
      : (x, y) => (x > y ? x : y);

  return reduce(source, {
    callback: maxBy,
  });
}
