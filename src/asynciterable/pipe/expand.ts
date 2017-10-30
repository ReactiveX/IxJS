import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ExpandAsyncIterable } from '../expand';

export function expand<TSource>(
  selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function expandOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExpandAsyncIterable<TSource>(source, selector);
  };
}
