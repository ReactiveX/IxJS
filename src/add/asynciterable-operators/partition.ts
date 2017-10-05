import { AsyncIterableX } from '../../asynciterable';
import { partition } from '../../asynciterable/partition';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function partitionProto<T>(
    this: AsyncIterableX<T>,
    fn: booleanAsyncPredicate<T>,
    thisArg?: any): AsyncIterableX<T>[] {
  return partition<T>(this, fn, thisArg);
}

AsyncIterableX.prototype.partition = partitionProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    partition: typeof partitionProto;
  }
}