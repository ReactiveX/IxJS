import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { IntersectIterable } from '../intersect';
import { comparer as defaultComparer } from '../../internal/comparer';

export function intersect<TSource>(
  second: Iterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function intersectOperatorFunction(first: Iterable<TSource>): IterableX<TSource> {
    return new IntersectIterable<TSource>(first, second, comparer);
  };
}
