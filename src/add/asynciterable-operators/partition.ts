import { AsyncIterableX } from '../../asynciterable';
import { partition } from '../../asynciterable/partition';

/**
 * @ignore
 */
export function partitionProto<T>(
    this: AsyncIterableX<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): AsyncIterableX<T>[] {
  return partition<T>(this, fn, thisArg);
}

AsyncIterableX.prototype.partition = partitionProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    partition: typeof partitionProto;
  }
}