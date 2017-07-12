import { IterableX } from '../iterable';
import { extremaBy, defaultCompare } from './_extremaby';

export function minBy<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (x: TSource) => TKey,
    comparer: (x: TKey, y: TKey) => number = defaultCompare): IterableX<TSource> {
  return extremaBy(source, keySelector, (key, minValue) => -comparer(key, minValue));
}
