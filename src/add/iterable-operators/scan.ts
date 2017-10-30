import { IterableX } from '../../iterable/iterablex';
import { scan } from '../../iterable/scan';

export function scanProto<T>(
  this: IterableX<T>,
  accumulator: (acc: T, value: T, index: number) => T
): IterableX<T>;
export function scanProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R
): IterableX<R>;
/**
 * @ignore
 */
export function scanProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (acc: T | R, value: T, index: number) => R,
  ...args: (T | R)[]
): IterableX<T | R> {
  return args.length === 1 ? scan(this, accumulator, args[0]) : scan(this, accumulator);
}

IterableX.prototype.scan = scanProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    scan: typeof scanProto;
  }
}
