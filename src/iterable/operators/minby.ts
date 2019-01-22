import { IterableX } from '../iterablex';
import { extremaBy, defaultCompare } from './_extremaby';
import { MonoTypeOperatorFunction } from '../../interfaces';

export function minBy<TSource, TKey>(
  keySelector: (x: TSource) => TKey,
  comparer: (x: TKey, y: TKey) => number = defaultCompare
): MonoTypeOperatorFunction<TSource> {
  return function minByOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return extremaBy(source, keySelector, (key, minValue) => -comparer(key, minValue));
  };
}
