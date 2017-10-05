import { AsyncIterableX } from '../../asynciterable';
import { takeWhile } from '../../asynciterable/takewhile';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function takeWhileProto<TSource>(
    this: AsyncIterableX<TSource>,
    predicate: booleanAsyncPredicate<TSource>): AsyncIterableX<TSource> {
  return takeWhile(this, predicate);
}

AsyncIterableX.prototype.takeWhile = takeWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}