import { IterableX } from '../../iterable';
import { filter } from '../../iterable/filter';

/**
 * @ignore
 */
export function filterProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): IterableX<S>;
export function filterProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): IterableX<T>;
export function filterProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): IterableX<T> {
  return filter(this, predicate, thisArg);
}

IterableX.prototype.filter = filterProto;

declare module '../../iterable' {
  interface IterableX<T> {
    filter: typeof filterProto;
  }
}
