import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { FilterAsyncIterable } from '../../asynciterable/operators/filter';

/**
 * @ignore
 */
export function filterProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => value is S,
  thisArg?: any
): AsyncIterableX<S>;
export function filterProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T>;
export function filterProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T> {
  return new FilterAsyncIterable<T>(this, predicate, thisArg);
}

AsyncIterableX.prototype.filter = filterProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    filter: typeof filterProto;
  }
}
