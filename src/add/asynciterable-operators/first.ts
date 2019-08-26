import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { first } from '../../asynciterable/first';

/**
 * @ignore
 */

export function firstProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S
): Promise<S | undefined>;
export function firstProto<T>(
  this: AsyncIterableX<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined>;
export function firstProto<T>(
  this: AsyncIterableX<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined> {
  return first(this, predicate);
}

AsyncIterableX.prototype.first = firstProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    first: typeof firstProto;
  }
}
