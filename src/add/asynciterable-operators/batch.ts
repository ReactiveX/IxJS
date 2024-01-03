import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { BatchAsyncIterable } from '../../asynciterable/operators/batch.js';

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
