import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ScanRightAsyncIterable } from '../scanright';

export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: never[]
): OperatorAsyncFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: R
): OperatorAsyncFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  ...seed: R[]
): OperatorAsyncFunction<T, R> {
  return function scanRightOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<R> {
    return new ScanRightAsyncIterable(source, accumulator, seed);
  };
}
