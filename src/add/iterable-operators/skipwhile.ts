import { IterableX } from '../../iterable/iterablex';
import { skipWhile } from '../../iterable/operators/skipwhile';

/**
 * @ignore
 */
export function skipWhileProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S
): IterableX<S>;
export function skipWhileProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean
): IterableX<T>;
export function skipWhileProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean
): IterableX<T> {
  return skipWhile<T>(predicate)(this);
}

IterableX.prototype.skipWhile = skipWhileProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    skipWhile: typeof skipWhileProto;
  }
}
