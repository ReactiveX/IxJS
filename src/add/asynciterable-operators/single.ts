import { AsyncIterableX } from '../../asynciterable';
import { single } from '../../asynciterable/single';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function singleProto<T>(
    this: AsyncIterableX<T>,
    selector?: booleanAsyncPredicate<T>): Promise<T | undefined> {
  return single(this, selector);
}

AsyncIterableX.prototype.single = singleProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    single: typeof singleProto;
  }
}