import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { ScanRightIterable } from '../scanright';

export function scanRight<T>(
  accumulator: (acc: T, value: T, index: number) => T
): OperatorFunction<T, T>;
export function scanRight<T, R = T>(
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R
): OperatorFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (acc: T | R, value: T, index: number) => R,
  ...args: (T | R)[]
): OperatorFunction<T, T | R> {
  return function scanRightOperatorFunction(source: Iterable<T>): IterableX<T | R> {
    return new ScanRightIterable(source, accumulator, ...args);
  };
}
