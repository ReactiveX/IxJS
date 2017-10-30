import { IterableX } from '../../iterable/iterablex';
import { retry } from '../../iterable/retry';

/**
 * @ignore
 */
export function retryProto<TSource>(
  this: IterableX<TSource>,
  count: number = -1
): IterableX<TSource> {
  return retry(this, count);
}

IterableX.prototype.retry = retryProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    retry: typeof retryProto;
  }
}
