import { AsyncIterableX } from '../../asynciterable';
import { filter } from '../../asynciterable/filter';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function filterProto<TSource>(
    this: AsyncIterable<TSource>,
    predicate: booleanAsyncPredicate<TSource>,
    thisArg?: any): AsyncIterableX<TSource> {
  return filter<TSource>(this, predicate, thisArg);
}

AsyncIterableX.prototype.filter = filterProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    filter: typeof filterProto;
  }
}