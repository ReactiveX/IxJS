import { IterableX } from '../../iterable/iterablex';
import { last } from '../../iterable/last';

/**
 * @ignore
 */
export function lastProto<T, S extends T>(
  this: IterableX<T>,
  predicate?: (value: T, index: number) => value is S
): S | undefined;
export function lastProto<T>(
  this: IterableX<T>,
  predicate?: (value: T, index: number) => boolean
): T | undefined;
export function lastProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean = () => true
): T | undefined {
  return last(this, predicate);
}

IterableX.prototype.last = lastProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    last: typeof lastProto;
  }
}
