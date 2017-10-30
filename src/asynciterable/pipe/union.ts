import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { UnionAsyncIterable } from '../union';
import { comparerAsync } from '../../internal/comparer';

export function union<TSource>(
  right: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function unionOperatorFunction(left: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new UnionAsyncIterable<TSource>(left, right, comparer);
  };
}
