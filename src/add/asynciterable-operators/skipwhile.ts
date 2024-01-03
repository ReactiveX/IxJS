import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { SkipWhileAsyncIterable } from '../../asynciterable/operators/skipwhile.js';

/**
 * @ignore
 */

export function skipWhileProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S
): AsyncIterableX<S>;
export function skipWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>
): AsyncIterableX<T>;
export function skipWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return new SkipWhileAsyncIterable<T>(this, predicate);
}

AsyncIterableX.prototype.skipWhile = skipWhileProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skipWhile: typeof skipWhileProto;
  }
}
