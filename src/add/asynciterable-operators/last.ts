import { AsyncIterableX } from '../../asynciterable';
import { last } from '../../asynciterable/last';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function lastProto<T>(
    this: AsyncIterableX<T>,
    selector?: booleanAsyncPredicate<T>): Promise<T | undefined> {
  return last(this, selector);
}

AsyncIterableX.prototype.last = lastProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    last: typeof lastProto;
  }
}