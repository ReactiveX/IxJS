import { IterableX } from './iterablex';
import { ConcatIterable } from './concat';

/**
 * Concatenates the input sequences.
 * @param {Iterable<Iterable<TSource>>} source Source sequences.
 * @return {Iterable<TSource>} Sequence with the elements of the source sequences concatenated.
 */
export function concatAll<TSource>(source: Iterable<Iterable<TSource>>): IterableX<TSource> {
  return new ConcatIterable<TSource>(source);
}
