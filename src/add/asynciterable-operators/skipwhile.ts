import { AsyncIterableX } from '../../asynciterable';
import { skipWhile } from '../../asynciterable/skipwhile';

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
  return skipWhile(this, predicate);
}

AsyncIterableX.prototype.skipWhile = skipWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    skipWhile: typeof skipWhileProto;
  }
}
