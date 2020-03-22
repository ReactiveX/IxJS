import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { extremaBy, defaultCompareAsync } from './_extremaby';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export function maxBy<TSource, TKey>(
  keySelector: (x: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  comparer: (x: TKey, y: TKey) => number | Promise<number> = defaultCompareAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function maxByOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return extremaBy(source, keySelector, comparer);
  };
}
