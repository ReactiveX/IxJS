import { IterableX } from '../../iterable/iterablex';
import { single } from '../../iterable/single';

/**
 * @ignore
 */
export function singleProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S
): S | undefined;
export function singleProto<T>(
  this: IterableX<T>,
  predicate?: (value: T, index: number) => boolean
): T | undefined;
export function singleProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean = () => true
): T | undefined {
  return single(this, predicate);
}

IterableX.prototype.single = singleProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    single: typeof singleProto;
  }
}
