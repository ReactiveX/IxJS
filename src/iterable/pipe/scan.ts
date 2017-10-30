import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { ScanIterable } from '../scan';

export function scan<T>(
  accumulator: (acc: T, value: T, index: number) => T
): OperatorFunction<T, T>;
export function scan<T, R = T>(
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R
): OperatorFunction<T, R>;
export function scan<T, R = T>(
  accumulator: (acc: T | R, value: T, index: number) => R,
  ...args: (T | R)[]
): OperatorFunction<T, T | R> {
  return function scanOperatorFunction(source: Iterable<T>): IterableX<T | R> {
    return new ScanIterable(source, accumulator, ...args);
  };
}
