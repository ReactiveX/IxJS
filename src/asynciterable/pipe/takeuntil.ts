import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TakeUntilAsyncIterable } from '../takeuntil';

export function takeUntil<TSource>(
  other: () => Promise<any>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeUntilOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new TakeUntilAsyncIterable<TSource>(source, other);
  };
}
