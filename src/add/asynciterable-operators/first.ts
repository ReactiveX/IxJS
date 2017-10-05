import { AsyncIterableX } from '../../asynciterable';
import { first } from '../../asynciterable/first';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function firstProto<T>(
    this: AsyncIterableX<T>,
    fn?: booleanAsyncPredicate<T>): Promise<T | undefined> {
  return first(this, fn);
}

AsyncIterableX.prototype.first = firstProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    first: typeof firstProto;
  }
}