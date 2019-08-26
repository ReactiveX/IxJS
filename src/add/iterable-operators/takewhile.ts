import { IterableX } from '../../iterable/iterablex';
import { takeWhile } from '../../iterable/operators/takewhile';

/**
 * @ignore
 */
export function takeWhileProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S
): IterableX<S>;
export function takeWhileProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean
): IterableX<T>;
export function takeWhileProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean
): IterableX<T> {
  return takeWhile<T>(predicate)(this);
}

IterableX.prototype.takeWhile = takeWhileProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}
