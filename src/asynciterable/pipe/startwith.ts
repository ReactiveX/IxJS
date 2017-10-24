import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { StartWithAsyncIterable } from '../startwith';

export function startWith<TSource>(...args: TSource[]): MonoTypeOperatorAsyncFunction<TSource> {
  return function startWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new StartWithAsyncIterable<TSource>(source, args);
  };
}
