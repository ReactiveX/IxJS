import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { last } from '../../asynciterable/last';

/**
 * @ignore
 */

export function lastProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S
): Promise<S | undefined>;
export function lastProto<T>(
  this: AsyncIterableX<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined>;
export function lastProto<T>(
  this: AsyncIterableX<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined> {
  return last(this, predicate);
}

AsyncIterableX.prototype.last = lastProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    last: typeof lastProto;
  }
}
