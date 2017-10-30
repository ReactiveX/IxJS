import { IterableX } from '../../iterable/iterablex';
import { reduceRight } from '../../iterable/reduceright';

export function reduceRightProto<T>(
  this: IterableX<T>,
  accumulator: (acc: T, value: T, index: number) => T,
  seed?: T
): T;
export function reduceRightProto<T>(
  this: IterableX<T>,
  accumulator: (acc: T[], value: T, index: number) => T[],
  seed?: T[]
): T[];
export function reduceRightProto<T, R>(
  this: IterableX<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed?: R
): R;
/**
 * @ignore
 */
export function reduceRightProto<T, R>(
  this: IterableX<T>,
  fn: (acc: R, x: T, index: number) => R,
  seed?: T | R
): T | R {
  return arguments.length === 2 ? reduceRight(this, fn, seed) : reduceRight(this, fn);
}

IterableX.prototype.reduceRight = reduceRightProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    reduceRight: typeof reduceRightProto;
  }
}
