import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { SkipWhileIterable } from '../skipwhile';

export function skipWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorFunction<T, S>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T> {
  return function skipWhileOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new SkipWhileIterable<T>(source, predicate);
  };
}
