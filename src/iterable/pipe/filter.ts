import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { FilterIterable } from '../filter';
import { bindCallback } from '../../internal/bindcallback';

export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): OperatorFunction<T, S>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): OperatorFunction<T, T>;
export function filter<TSource>(
  predicate: (value: TSource, index: number) => boolean,
  thisArg?: any
): OperatorFunction<TSource, TSource> {
  return function filterOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new FilterIterable<TSource>(source, bindCallback(predicate, thisArg, 2));
  };
}
