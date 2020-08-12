import { AsyncIterableX } from '../asynciterablex';
import { as } from '../as';
import { flatMap } from './flatmap';
import { OperatorAsyncFunction } from '../../interfaces';

/**
 * Merges elements from all inner async-iterable sequences into a single async-iterable sequence.
 *
 * @export
 * @template TSource The type of the elements in the source sequences.
 * @returns {OperatorAsyncFunction<AsyncIterable<TSource>, TSource>} The async-iterable sequence that merges the elements of the inner sequences.
 */
export function mergeAll<TSource>(): OperatorAsyncFunction<AsyncIterable<TSource>, TSource> {
  return function mergeAllOperatorFunction(
    source: AsyncIterable<AsyncIterable<TSource>>
  ): AsyncIterableX<TSource> {
    return as(source)['pipe'](flatMap<AsyncIterable<TSource>, TSource>((s) => s));
  };
}
