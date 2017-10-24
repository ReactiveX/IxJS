import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { SkipWhileAsyncIterable } from '../skipwhile';

export function skipWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorAsyncFunction<T, S>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T> {
  return function skipWhileOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new SkipWhileAsyncIterable<T>(source, predicate);
  };
}
