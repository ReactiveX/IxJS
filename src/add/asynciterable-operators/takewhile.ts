import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { takeWhile } from '../../asynciterable/operators/takewhile';

/**
 * @ignore
 */

export function takeWhileProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S
): AsyncIterableX<S>;
export function takeWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>
): AsyncIterableX<T>;
export function takeWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return takeWhile<T>(predicate)(this);
}

AsyncIterableX.prototype.takeWhile = takeWhileProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}
