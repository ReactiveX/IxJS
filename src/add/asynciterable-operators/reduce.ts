import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { reduce } from '../../asynciterable/reduce';

export async function reduceProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: never[]
): Promise<R>;
export async function reduceProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: R
): Promise<R>;
/**
 * @ignore
 */
export async function reduceProto<T, R = T>(
  this: AsyncIterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  ...seed: R[]
): Promise<R> {
  return reduce(this, accumulator, ...seed);
}

AsyncIterableX.prototype.reduce = reduceProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    reduce: typeof reduceProto;
  }
}
