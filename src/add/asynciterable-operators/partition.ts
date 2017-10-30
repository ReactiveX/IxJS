import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { partition } from '../../asynciterable/partition';

/**
 * @ignore
 */

export function partitionProto<T, S extends T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): AsyncIterableX<S>[];
export function partitionProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T>[];
export function partitionProto<T>(
  this: AsyncIterableX<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): AsyncIterableX<T>[] {
  return partition<T>(this, predicate, thisArg);
}

AsyncIterableX.prototype.partition = partitionProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    partition: typeof partitionProto;
  }
}
