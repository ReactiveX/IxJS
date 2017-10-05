import { AsyncIterableX } from '../../asynciterable';
import { every } from '../../asynciterable/every';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function everyProto<T>(
    this: AsyncIterableX<T>,
    comparer: booleanAsyncPredicate<T>): Promise<boolean> {
  return every<T>(this, comparer);
}

AsyncIterableX.prototype.every = everyProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    every: typeof everyProto;
  }
}
