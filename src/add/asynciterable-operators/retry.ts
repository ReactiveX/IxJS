import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { retry } from '../../asynciterable/operators/retry.js';

/**
 * @ignore
 */
export function retryProto<T>(this: AsyncIterableX<T>, count = -1): AsyncIterableX<T> {
  return retry<T>(count)(this);
}

AsyncIterableX.prototype.retry = retryProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    retry: typeof retryProto;
  }
}
