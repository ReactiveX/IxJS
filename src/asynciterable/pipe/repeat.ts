import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { RepeatAsyncIterable } from '../repeat';

export function repeat<TSource>(count: number = -1): MonoTypeOperatorAsyncFunction<TSource> {
  return function repeatOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new RepeatAsyncIterable<TSource>(source, count);
  };
}
