import { AsyncIterableX } from '../../asynciterable';
import { skipWhile } from '../../asynciterable/skipwhile';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function skipWhileProto<TSource>(
    this: AsyncIterableX<TSource>,
    predicate: booleanAsyncPredicate<TSource>): AsyncIterableX<TSource> {
  return skipWhile(this, predicate);
}

AsyncIterableX.prototype.skipWhile = skipWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    skipWhile: typeof skipWhileProto;
  }
}