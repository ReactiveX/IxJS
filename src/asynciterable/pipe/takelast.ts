import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TakeLastAsyncIterable } from '../takelast';

export function takeLast<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeLastOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new TakeLastAsyncIterable<TSource>(source, count);
  };
}
