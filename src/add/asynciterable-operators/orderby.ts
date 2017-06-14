import { AsyncIterableX } from '../../asynciterable';
import { orderBy, orderByDescending, OrderedAsyncIterableX } from '../../asynciterable/orderby';

/**
 * @ignore
 */
export function orderByProto<TKey, TSource>(
    this: AsyncIterableX<TSource>,
    keySelector: (item: TSource) => TKey,
    comparer?: (fst: TKey, snd: TKey) => number): OrderedAsyncIterableX<TKey, TSource> {
  return orderBy<TKey, TSource>(this, keySelector, comparer);
}

/**
 * @ignore
 */
export function orderByDescendingProto<TKey, TSource>(
    this: AsyncIterableX<TSource>,
    keySelector: (item: TSource) => TKey,
    comparer?: (fst: TKey, snd: TKey) => number): OrderedAsyncIterableX<TKey, TSource> {
  return orderByDescending<TKey, TSource>(this, keySelector, comparer);
}

AsyncIterableX.prototype.orderBy = orderByProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    orderBy: typeof orderByProto;
    orderByDescending: typeof orderByDescendingProto;
  }
}