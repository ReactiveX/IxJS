import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { filter } from '../../asynciterable/operators/filter';

/**
 * @ignore
 */

export function filterProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): AsyncIterableX<S>;
export function filterProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T>;
export function filterProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T> {
  return filter<T>(predicate, thisArg)(this);
}

AsyncIterableX.prototype.filter = filterProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    filter: typeof filterProto;
  }
}
