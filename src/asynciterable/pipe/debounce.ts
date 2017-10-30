import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { DebounceAsyncIterable } from '../debounce';

export function debounce<TSource>(time: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function debounceOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DebounceAsyncIterable<TSource>(source, time);
  };
}
