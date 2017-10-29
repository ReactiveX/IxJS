import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { SkipUntilAsyncIterable } from '../skipuntil';

export function skipUntil<TSource>(
  other: () => Promise<any>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipUntilOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new SkipUntilAsyncIterable<TSource>(source, other);
  };
}
