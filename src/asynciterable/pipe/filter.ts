import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { FilterAsyncIterable } from '../filter';
import { bindCallback } from '../../internal/bindcallback';

export function filter<TSource>(
  predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): MonoTypeOperatorAsyncFunction<TSource> {
  return function filterOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new FilterAsyncIterable<TSource>(source, bindCallback(predicate, thisArg, 2));
  };
}
