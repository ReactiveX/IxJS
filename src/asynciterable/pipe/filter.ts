import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { FilterAsyncIterable } from '../filter';
import { bindCallback } from '../../internal/bindcallback';

export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): OperatorAsyncFunction<T, S>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): OperatorAsyncFunction<T, T>;
export function filter<TSource>(
  predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): OperatorAsyncFunction<TSource, TSource> {
  return function filterOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new FilterAsyncIterable<TSource>(source, bindCallback(predicate, thisArg, 2));
  };
}
