import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { TakeAsyncIterable } from '../take';

export function take<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TakeAsyncIterable<TSource>(source, count);
  };
}
