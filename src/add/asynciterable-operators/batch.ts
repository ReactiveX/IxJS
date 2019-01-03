import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { batch } from '../../asynciterable/batch';

/**
 * @ignore
 */
export function batchProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T[]> {
  return batch<T>(this);
}

AsyncIterableX.prototype.batch = batchProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    batch: typeof batchProto;
  }
}
