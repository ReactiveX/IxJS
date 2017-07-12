import { IterableX } from '../iterable';
import { defer } from './defer';
import { empty } from './empty';

/**
 * Returns a sequence from a dictionary based on the result of evaluating a selector function.
 * @example
 * const map = new Map([
 *   [1, [1, 2, 3]],
 *   [2, [2, 3, 4]],
 *   [3, [4, 5, 6]]
 * ]);
 * const result = case(
 *   () => 2,
 *   map,
 *   [5, 6, 7]
 * );
 * const result = Ix.Iterable.case(
 *   () => 2,
 *   map,
 *   [5, 6, 7]
 * );
 * for (const item of result) {
 *   console.log(result);
 * }
 * @param {function(): TSource} selector Selector function used to pick a sequence from the given sources.
 * @param {Map<TSource, Iterable<TResult>>} sources Dictionary mapping selector values onto resulting sequences.
 * @param {Iterable<TResult>} [defaultSource] Default sequence to return in case there's no corresponding source
 * for the computed selector value.  If not specified, defaults to an empty sequence.
 * @return {Iterable<TResult>} The source sequence corresponding with the evaluated selector value; otherwise, the default source.
 */
export function _case<TSource, TResult>(
    selector: () => TSource,
    sources: Map<TSource, Iterable<TResult>>,
    defaultSource: Iterable<TResult> = empty<TResult>()): IterableX<TResult> {
  return defer<TResult>(() => {
    const key = selector();
    return sources.has(key) ? sources.get(key)! : defaultSource;
  });
}
