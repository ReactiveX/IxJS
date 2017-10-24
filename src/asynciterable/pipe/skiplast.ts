import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { SkipLastAsyncIterable } from '../skiplast';

export function skipLast<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipLastOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new SkipLastAsyncIterable<TSource>(source, count);
  };
}
