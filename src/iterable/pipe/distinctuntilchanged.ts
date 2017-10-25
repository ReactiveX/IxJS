import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { DistinctUntilChangedIterable } from '../distinctuntilchanged';
import { identity } from '../../internal/identity';
import { comparer as defaultComparer } from '../../internal/comparer';

export function distinctUntilChanged<TSource, TKey>(
  keySelector: (value: TSource) => TKey = identity,
  comparer: (first: TKey, second: TKey) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function distinctUntilChangedOperatorFunction(
    source: Iterable<TSource>
  ): IterableX<TSource> {
    return new DistinctUntilChangedIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
