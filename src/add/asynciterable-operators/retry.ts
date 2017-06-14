import { AsyncIterableX } from '../../asynciterable';
import { retry } from '../../asynciterable/retry';

/**
 * @ignore
 */
export function retryProto<TSource>(
    this: AsyncIterableX<TSource>,
    count: number = -1): AsyncIterableX<TSource> {
  return retry(this, count);
}

AsyncIterableX.prototype.retry = retryProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    retry: typeof retryProto;
  }
}