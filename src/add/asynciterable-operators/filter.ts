import { AsyncIterableX } from '../../asynciterable';
import { filter } from '../../asynciterable/filter';

/**
 * @ignore
 */

export function filterProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): AsyncIterableX<S>;
export function filterProto<TSource>(
  this: AsyncIterableX<TSource>,
  predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<TSource>;
export function filterProto<TSource>(
  this: AsyncIterableX<TSource>,
  predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<TSource> {
  return filter<TSource>(this, predicate, thisArg);
}

AsyncIterableX.prototype.filter = filterProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    filter: typeof filterProto;
  }
}
