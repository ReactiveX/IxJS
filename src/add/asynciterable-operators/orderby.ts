import { AsyncIterableX } from '../../asynciterable';
import { orderBy, orderByDescending, OrderedAsyncIterableX } from '../../asynciterable/orderby';
import { thenBy as _thenBy, thenByDescending as _thenByDescending } from '../../asynciterable/orderby';

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
AsyncIterableX.prototype.orderByDescending = orderByDescendingProto;

export declare namespace asynciterable {
  let thenBy: typeof _thenBy;
  let thenByDescending: typeof _thenByDescending;
}

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    orderBy: typeof orderByProto;
    orderByDescending: typeof orderByDescendingProto;
  }
}