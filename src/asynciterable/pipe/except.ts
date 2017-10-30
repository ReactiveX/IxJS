import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ExceptAsyncIterable } from '../except';
import { comparerAsync } from '../../internal/comparer';

export function except<TSource>(
  second: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function exceptOperatorFunction(first: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExceptAsyncIterable<TSource>(first, second, comparer);
  };
}
