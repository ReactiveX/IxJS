import { AsyncIterableX } from '../../asynciterable';
import { reduceRight } from '../../asynciterable/reduceright';

export async function reduceRightProto<T>(
  this: AsyncIterableX<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>
): Promise<T>;
export async function reduceRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R
): Promise<R>;
/**
 * @ignore
 */
export function reduceRightProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
  ...args: (T | R)[]
): Promise<T | R> {
  return args.length === 1
    ? reduceRight(this, accumulator, args[0])
    : reduceRight(this, accumulator);
}

AsyncIterableX.prototype.reduceRight = reduceRightProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    reduceRight: typeof reduceRightProto;
  }
}
