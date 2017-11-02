import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { ScanIterable } from '../scan';

export function scan<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): OperatorFunction<T, R>;
export function scan<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): OperatorFunction<T, R>;
export function scan<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): OperatorFunction<T, R> {
  return function scanOperatorFunction(source: Iterable<T>): IterableX<R> {
    return new ScanIterable(source, accumulator, seed);
  };
}
