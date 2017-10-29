import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { IntersectAsyncIterable } from '../intersect';
import { comparerAsync } from '../../internal/comparer';

export function intersect<TSource>(
  second: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function intersectOperatorFunction(
    first: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IntersectAsyncIterable<TSource>(first, second, comparer);
  };
}
