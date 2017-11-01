import { IterableX } from '../../iterable/iterablex';
import { reduce } from '../../iterable/reduce';

export function reduceProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): R;
export function reduceProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): R;
/**
 * @ignore
 */
export function reduceProto<T, R = T>(
  this: IterableX<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): R {
  return reduce(this, accumulator, ...seed);
}

IterableX.prototype.reduce = reduceProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    reduce: typeof reduceProto;
  }
}
