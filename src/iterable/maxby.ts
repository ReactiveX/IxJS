import { IterableX } from '../iterable';
import { extremaBy, defaultCompare } from './_extremaby';

export function maxBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: (x: TKey, y: TKey) => number = defaultCompare): IterableX<TSource> {
  return extremaBy(source, keySelector, comparer);
}
