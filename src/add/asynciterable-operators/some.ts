import { AsyncIterableX } from '../../asynciterable';
import { some } from '../../asynciterable/some';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function someProto<T>(
    this: AsyncIterableX<T>,
    comparer: booleanAsyncPredicate<T>): Promise<boolean> {
  return some(this, comparer);
}

AsyncIterableX.prototype.some = someProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    some: typeof someProto;
  }
}