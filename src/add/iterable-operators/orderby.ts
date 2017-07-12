import { IterableX } from '../../iterable';
import { orderBy, orderByDescending, OrderedIterableX } from '../../iterable/orderby';
import { thenBy as _thenBy, thenByDescending as _thenByDescending } from '../../iterable/orderby';

/**
 * @ignore
 */
export function orderByProto<TKey, TSource>(
      this: Iterable<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer?: (fst: TKey, snd: TKey) => number): OrderedIterableX<TKey, TSource> {
  return orderBy<TKey, TSource>(this, keySelector, comparer);
}

/**
 * @ignore
 */
export function orderByDescendingProto<TKey, TSource>(
      this: Iterable<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer?: (fst: TKey, snd: TKey) => number): OrderedIterableX<TKey, TSource> {
  return orderByDescending<TKey, TSource>(this, keySelector, comparer);
}

IterableX.prototype.orderBy = orderByProto;
IterableX.prototype.orderByDescending = orderByDescendingProto;

export declare namespace iterable {
  let thenBy: typeof _thenBy;
  let thenByDescending: typeof _thenByDescending;
}

declare module '../../iterable' {
  interface IterableX<T> {
    orderBy: typeof orderByProto;
    orderByDescending: typeof orderByDescendingProto;
  }
}