import { IterableX } from '../../iterable/iterablex';
import { find } from '../../iterable/find';

/**
 * @ignore
 */

export function findProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): S | undefined;
export function findProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): T | undefined;
export function findProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): T | undefined {
  return find(this, predicate, thisArg);
}

IterableX.prototype.find = findProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    find: typeof findProto;
  }
}
