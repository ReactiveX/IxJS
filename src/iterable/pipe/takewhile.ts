import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { TakeWhileIterable } from '../takewhile';

export function takeWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorFunction<T, S>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T> {
  return function takeWhileOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new TakeWhileIterable<T>(source, predicate);
  };
}
