import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ScanAsyncIterable } from '../scan';

export function scan<T>(
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>
): OperatorAsyncFunction<T, T>;
export function scan<T, R = T>(
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R
): OperatorAsyncFunction<T, R>;
export function scan<T, R = T>(
  accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
  ...args: (T | R)[]
): OperatorAsyncFunction<T, T | R> {
  return function scanOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T | R> {
    return new ScanAsyncIterable(source, accumulator, ...args);
  };
}
