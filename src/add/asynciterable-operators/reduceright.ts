import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { reduceRight } from '../../asynciterable/reduceright';

export async function reduceRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: never[]
): Promise<R>;
export async function reduceRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: R
): Promise<R>;
/**
 * @ignore
 */
export async function reduceRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  ...seed: R[]
): Promise<R> {
  return reduceRight(this, accumulator, ...seed);
}

AsyncIterableX.prototype.reduceRight = reduceRightProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    reduceRight: typeof reduceRightProto;
  }
}
