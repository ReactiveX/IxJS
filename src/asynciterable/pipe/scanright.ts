import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ScanRightAsyncIterable } from '../scanright';

export function scanRight<T>(
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>
): OperatorAsyncFunction<T, T>;
export function scanRight<T, R = T>(
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R
): OperatorAsyncFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
  ...args: (T | R)[]
): OperatorAsyncFunction<T, T | R> {
  return function scanRightOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T | R> {
    return new ScanRightAsyncIterable(source, accumulator, ...args);
  };
}
