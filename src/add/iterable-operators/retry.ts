import { IterableX } from '../../iterable/iterablex.js';
import { retry } from '../../iterable/operators/retry.js';

/**
 * @ignore
 */
export function retryProto<T>(this: IterableX<T>, count = -1): IterableX<T> {
  return retry<T>(count)(this);
}

IterableX.prototype.retry = retryProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    retry: typeof retryProto;
  }
}
