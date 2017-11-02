import { IterableX } from '../../iterable/iterablex';
import { scanRight } from '../../iterable/scanright';

export function scanRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): IterableX<R>;
export function scanRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): IterableX<R>;
/**
 * @ignore
 */
export function scanRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): IterableX<R> {
  return scanRight(this, accumulator, ...seed);
}

IterableX.prototype.scanRight = scanRightProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    scanRight: typeof scanRightProto;
  }
}
