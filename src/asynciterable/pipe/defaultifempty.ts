import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { DefaultIfEmptyAsyncIterable } from '../defaultifempty';

export function defaultIfEmpty<T>(defaultValue: T): MonoTypeOperatorAsyncFunction<T> {
  return function defaultIfEmptyOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new DefaultIfEmptyAsyncIterable<T>(source, defaultValue);
  };
}
