import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { DelayAsyncIterable } from '../delay';

export function delay<TSource>(dueTime: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function delayOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new DelayAsyncIterable<TSource>(source, dueTime);
  };
}
