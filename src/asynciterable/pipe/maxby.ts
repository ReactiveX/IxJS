import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { extremaBy, defaultCompareAsync } from '../_extremaby';

export function maxBy<TSource, TKey>(
  keySelector: (x: TSource) => TKey | Promise<TKey>,
  comparer: (x: TKey, y: TKey) => number | Promise<number> = defaultCompareAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function maxByOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return extremaBy(source, keySelector, comparer);
  };
}
