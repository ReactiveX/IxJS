import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ThrottleAsyncIterable } from '../throttle';

export function throttle<TSource>(time: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function throttleOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new ThrottleAsyncIterable<TSource>(source, time);
  };
}
