import { IterableX } from '../iterablex';
import { extremaBy, defaultCompare } from './_extremaby';
import { MonoTypeOperatorFunction } from '../../interfaces';

export function maxBy<TSource, TKey>(
  keySelector: (x: TSource) => TKey,
  comparer: (x: TKey, y: TKey) => number = defaultCompare
): MonoTypeOperatorFunction<TSource> {
  return function maxByOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return extremaBy(source, keySelector, comparer);
  };
}
