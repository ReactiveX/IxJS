import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { ScanRightIterable } from '../scanright';

export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): OperatorFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): OperatorFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): OperatorFunction<T, R> {
  return function scanRightOperatorFunction(source: Iterable<T>): IterableX<R> {
    return new ScanRightIterable(source, accumulator, seed);
  };
}
