import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { skipWhile } from '../../asynciterable/operators/skipwhile';

/**
 * @ignore
 */

export function skipWhileProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S
): AsyncIterableX<S>;
export function skipWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): AsyncIterableX<T>;
export function skipWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return skipWhile<T>(predicate)(this);
}

AsyncIterableX.prototype.skipWhile = skipWhileProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skipWhile: typeof skipWhileProto;
  }
}
