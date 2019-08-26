import { IterableX } from '../../iterable/iterablex';
import { every } from '../../iterable/every';

/**
 * @ignore
 */
export function everyProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S
): boolean;
export function everyProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean
): boolean;
export function everyProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean
): boolean {
  return every(this, predicate);
}

IterableX.prototype.every = everyProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    every: typeof everyProto;
  }
}
