import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { single } from '../../asynciterable/single';

/**
 * @ignore
 */

export function singleProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S
): Promise<S | undefined>;
export function singleProto<T>(
  this: AsyncIterableX<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined>;
export function singleProto<T>(
  this: AsyncIterableX<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined> {
  return single(this, predicate);
}

AsyncIterableX.prototype.single = singleProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    single: typeof singleProto;
  }
}
