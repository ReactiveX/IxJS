import { AsyncIterableX } from '../asynciterablex';
import { extremaBy, defaultCompareAsync } from './_extremaby';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export function minBy<TSource, TKey>(
  keySelector: (x: TSource) => TKey | Promise<TKey>,
  comparer: (x: TKey, y: TKey) => number | Promise<number> = defaultCompareAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function minByOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return extremaBy(source, keySelector, async (key, minValue) => -await comparer(key, minValue));
  };
}
