import { AsyncIterableX } from '../../asynciterable';
import { takeWhile } from '../../asynciterable/takewhile';

/**
 * @ignore
 */

export function takeWhileProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S
): AsyncIterableX<S>;
export function takeWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): AsyncIterableX<T>;
export function takeWhileProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return takeWhile(this, predicate);
}

AsyncIterableX.prototype.takeWhile = takeWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}
