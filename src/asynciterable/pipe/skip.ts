import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { SkipAsyncIterable } from '../skip';

export function skip<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new SkipAsyncIterable<TSource>(source, count);
  };
}
