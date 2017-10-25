import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { UnionIterable } from '../union';
import { comparer as defaultComparer } from '../../internal/comparer';

export function union<TSource>(
  right: Iterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function unionOperatorFunction(left: Iterable<TSource>): IterableX<TSource> {
    return new UnionIterable<TSource>(left, right, comparer);
  };
}
