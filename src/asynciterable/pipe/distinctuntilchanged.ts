import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { DistinctUntilChangedAsyncIterable } from '../distinctuntilchanged';
import { identityAsync } from '../../internal/identity';
import { comparerAsync } from '../../internal/comparer';

export function distinctUntilChanged<TSource, TKey>(
  keySelector: (value: TSource) => TKey | Promise<TKey> = identityAsync,
  comparer: (first: TKey, second: TKey) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctUntilChangedOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DistinctUntilChangedAsyncIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
