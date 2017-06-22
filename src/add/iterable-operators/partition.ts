import { IterableX } from '../../iterable';
import { partition } from '../../iterable/partition';

/**
 * @ignore
 */
export function partitionProto<T>(
    this: IterableX<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): IterableX<T>[] {
  return partition<T>(this, fn, thisArg);
}

IterableX.prototype.partition = partitionProto;

declare module '../../iterable' {
  interface IterableX<T> {
    partition: typeof partitionProto;
  }
}