import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { DistinctIterable } from '../distinct';
import { identity } from '../../internal/identity';
import { comparer as defaultComparer } from '../../internal/comparer';

export function distinct<TSource, TKey>(
  keySelector: (value: TSource) => TKey = identity,
  comparer: (x: TKey, y: TKey) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function distinctOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new DistinctIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
