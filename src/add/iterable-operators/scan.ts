import { IterableX } from '../../iterable/iterablex';
import { scan } from '../../iterable/operators/scan';

export function scanProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): IterableX<R>;
export function scanProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): IterableX<R>;
/**
 * @ignore
 */
export function scanProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): IterableX<R> {
  return scan(accumulator, ...seed)(this);
}

IterableX.prototype.scan = scanProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    scan: typeof scanProto;
  }
}
