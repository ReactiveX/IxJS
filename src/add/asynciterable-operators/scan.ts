import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { scan } from '../../asynciterable/scan';

export function scanProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: never[]
): AsyncIterableX<R>;
export function scanProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: R
): AsyncIterableX<R>;
/**
 * @ignore
 */
export function scanProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  ...seed: R[]
): AsyncIterableX<R> {
  return scan(this, accumulator, ...seed);
}

AsyncIterableX.prototype.scan = scanProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    scan: typeof scanProto;
  }
}
