import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import {
  orderBy,
  orderByDescending,
  OrderedAsyncIterableX
} from '../../asynciterable/operators/orderby';
import {
  thenBy as _thenBy,
  thenByDescending as _thenByDescending
} from '../../asynciterable/operators/orderby';

/**
 * @ignore
 */
export function orderByProto<TKey, TSource>(
  this: AsyncIterableX<TSource>,
  keySelector: (item: TSource) => TKey,
  comparer?: (fst: TKey, snd: TKey) => number
): OrderedAsyncIterableX<TKey, TSource> {
  return orderBy<TKey, TSource>(keySelector, comparer)(this);
}

/**
 * @ignore
 */
export function orderByDescendingProto<TKey, TSource>(
  this: AsyncIterableX<TSource>,
  keySelector: (item: TSource) => TKey,
  comparer?: (fst: TKey, snd: TKey) => number
): OrderedAsyncIterableX<TKey, TSource> {
  return orderByDescending<TKey, TSource>(keySelector, comparer)(this);
}

AsyncIterableX.prototype.orderBy = orderByProto;
AsyncIterableX.prototype.orderByDescending = orderByDescendingProto;

export declare namespace asynciterable {
  let thenBy: typeof _thenBy;
  let thenByDescending: typeof _thenByDescending;
}

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    orderBy: typeof orderByProto;
    orderByDescending: typeof orderByDescendingProto;
  }
}
