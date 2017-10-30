import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TimeoutAsyncIterable } from '../timeout';

export function timeout<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function timeoutOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TimeoutAsyncIterable<TSource>(source, dueTime);
  };
}
