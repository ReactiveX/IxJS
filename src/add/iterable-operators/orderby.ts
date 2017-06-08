import { IterableX } from '../../iterable';
import { orderBy, orderByDescending, OrderedIterableX } from '../../iterable/orderby';

export function orderByProto<TKey, TSource>(
      this: Iterable<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer?: (fst: TKey, snd: TKey) => number): OrderedIterableX<TKey, TSource> {
  return orderBy<TKey, TSource>(this, keySelector, comparer);
}

export function orderByDescendingProto<TKey, TSource>(
      this: Iterable<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer?: (fst: TKey, snd: TKey) => number): OrderedIterableX<TKey, TSource> {
  return orderByDescending<TKey, TSource>(this, keySelector, comparer);
}

IterableX.prototype.orderBy = orderByProto;

declare module '../../iterable' {
  interface IterableX<T> {
    orderBy: typeof orderByProto;
    orderByDescending: typeof orderByDescendingProto;
  }
}