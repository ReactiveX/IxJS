import { AsyncIterableX } from '../asynciterable';
import { extremaBy, defaultCompareAsync } from './_extremaby';

export function maxBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (x: TSource) => TKey | Promise<TKey>,
    comparer: (x: TKey, y: TKey) => number | Promise<number> = defaultCompareAsync): AsyncIterableX<TSource> {
  return extremaBy(source, keySelector, comparer);
}
