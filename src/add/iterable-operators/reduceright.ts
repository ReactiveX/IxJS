import { IterableX } from '../../iterable/iterablex';
import { reduceRight } from '../../iterable/reduceright';

export function reduceRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): R;
export function reduceRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): R;
/**
 * @ignore
 */
export function reduceRightProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): R {
  return reduceRight(this, accumulator, ...seed);
}

IterableX.prototype.reduceRight = reduceRightProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    reduceRight: typeof reduceRightProto;
  }
}
