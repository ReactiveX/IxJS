import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { find } from '../../asynciterable/find';

/**
 * @ignore
 */

export function findProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): Promise<S | undefined>;
export function findProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): Promise<T | undefined>;
export function findProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): Promise<T | undefined> {
  return find(this, predicate, thisArg);
}

AsyncIterableX.prototype.find = findProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    find: typeof findProto;
  }
}
