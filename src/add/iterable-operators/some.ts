import { IterableX } from '../../iterable/iterablex';
import { some } from '../../iterable/some';

/**
 * @ignore
 */
export function someProto<T, S extends T>(
  this: IterableX<T>,
  comparer: (value: T, index: number) => value is S
): boolean;
export function someProto<T>(
  this: IterableX<T>,
  comparer: (value: T, index: number) => boolean
): boolean;
export function someProto<T>(
  this: IterableX<T>,
  comparer: (value: T, index: number) => boolean
): boolean {
  return some(this, comparer);
}

IterableX.prototype.some = someProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    some: typeof someProto;
  }
}
