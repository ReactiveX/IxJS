import { IterableX } from '../iterable';
import { concatAll } from './concat';
import { map } from './map';

/**
 * Concatenates the iterable sequences obtained by running the result selector for each
 * element in the given source sequence.
 * @param {Iterable<T>} source Iterable source for which each element will be mapped onto an
 * iterable source that will be concatenated in the result sequence.
 * @param {function:(value: T) => Iterable<R>} resultSelector Function to select an iterable source
 * for each element in the source sequence.
 * @returns {Iterable<R>} The iterable sequence obtained by concatenating the sources returned by
 * result selector for each element in the source.
 */
export function _for<TSource, TResult>(
    source: Iterable<TSource>,
    resultSelector: (value: TSource) => Iterable<TResult>): IterableX<TResult> {
  return concatAll(map(source, resultSelector));
}