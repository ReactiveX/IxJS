import { IterableX } from '../../iterable/iterablex';
import { first } from '../../iterable/first';

/**
 * @ignore
 */

export function firstProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S
): S | undefined;
export function firstProto<T>(
  this: IterableX<T>,
  predicate?: (value: T, index: number) => boolean
): T | undefined;
export function firstProto<T>(
  this: IterableX<T>,
  predicate?: (value: T, index: number) => boolean
): T | undefined {
  return first(this, predicate);
}

IterableX.prototype.first = firstProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    first: typeof firstProto;
  }
}
