import { IterableX } from '../../iterable';
import { partition } from '../../iterable/partition';

/**
 * @ignore
 */

export function partitionProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): IterableX<S>[];
export function partitionProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): IterableX<T>[];
export function partitionProto<T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): IterableX<T>[] {
  return partition(this, predicate, thisArg);
}

IterableX.prototype.partition = partitionProto;

declare module '../../iterable' {
  interface IterableX<T> {
    partition: typeof partitionProto;
  }
}
