import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TakeWhileAsyncIterable } from '../takewhile';

export function takeWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorAsyncFunction<T, S>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T> {
  return function takeWhileOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new TakeWhileAsyncIterable<T>(source, predicate);
  };
}
