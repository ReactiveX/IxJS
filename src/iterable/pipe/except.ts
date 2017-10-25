import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { ExceptIterable } from '../except';
import { comparer as defaultComparer } from '../../internal/comparer';

export function except<TSource>(
  second: Iterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function exceptOperatorFunction(first: Iterable<TSource>): IterableX<TSource> {
    return new ExceptIterable<TSource>(first, second, comparer);
  };
}
