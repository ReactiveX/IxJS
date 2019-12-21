import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { retry } from '../../asynciterable/operators/retry';

/**
 * @ignore
 */
export function retryProto<T>(this: AsyncIterableX<T>, count: number = -1): AsyncIterableX<T> {
  return retry<T>(count)(this);
}

AsyncIterableX.prototype.retry = retryProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    retry: typeof retryProto;
  }
}
