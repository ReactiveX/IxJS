import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { BatchAsyncIterable } from '../../asynciterable/operators/batch';

/**
 * @ignore
 */
export function batchProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T[]> {
  return new BatchAsyncIterable<T>(this);
}

AsyncIterableX.prototype.batch = batchProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    batch: typeof batchProto;
  }
}
