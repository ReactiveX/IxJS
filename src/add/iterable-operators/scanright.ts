import { IterableX } from '../../iterable';
import { scanRight } from '../../iterable/scanright';

export function scanRightProto<T>(
  this: Iterable<T>,
  accumulator: (acc: T, value: T, index: number) => T): IterableX<T>;
export function scanRightProto<T, R = T>(
  this: Iterable<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R): IterableX<R>;
/**
 * @ignore
 */
export function scanRightProto<T, R = T>(
    this: Iterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R,
    ...args: (T | R)[]): IterableX<T | R> {
  return args.length === 3 ? scanRight(this, accumulator, args[0]) : scanRight(this, accumulator);
}

IterableX.prototype.scanRight = scanRightProto;

declare module '../../iterable' {
  interface IterableX<T> {
    scanRight: typeof scanRightProto;
  }
}