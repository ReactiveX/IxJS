import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { scanRight } from '../../asynciterable/scanright';

export function scanRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): AsyncIterableX<R>;
export function scanRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): AsyncIterableX<R>;
/**
 * @ignore
 */
export function scanRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): AsyncIterableX<R> {
  return scanRight(this, accumulator, ...seed);
}

AsyncIterableX.prototype.scanRight = scanRightProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    scanRight: typeof scanRightProto;
  }
}
