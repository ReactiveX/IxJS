import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { IgnoreElementsAsyncIterable } from '../ignoreelements';

export function ignoreElements<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function ignoreElementsOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IgnoreElementsAsyncIterable<TSource>(source);
  };
}
