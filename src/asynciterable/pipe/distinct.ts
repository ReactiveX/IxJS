import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { DistinctAsyncIterable } from '../distinct';
import { identityAsync } from '../../internal/identity';
import { comparerAsync } from '../../internal/comparer';

export function distinct<TSource, TKey>(
  keySelector: (value: TSource) => TKey | Promise<TKey> = identityAsync,
  comparer: (x: TKey, y: TKey) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new DistinctAsyncIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
