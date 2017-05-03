import { IterableX } from '../../iterable';
import { retry } from '../../iterable/retry';

export function retryProto<TSource>(
    this: IterableX<TSource>,
    count: number = -1): IterableX<TSource> {
  return new IterableX(retry(this, count));
}

IterableX.prototype.retry = retryProto;

declare module '../../iterable' {
  interface IterableX<T> {
    retry: typeof retryProto;
  }
}