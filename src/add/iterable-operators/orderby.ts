import { IterableX } from '../../iterable/iterablex';
import { orderBy, orderByDescending, OrderedIterableX } from '../../iterable/operators/orderby';
import {
  thenBy as _thenBy,
  thenByDescending as _thenByDescending,
} from '../../iterable/operators/orderby';

/**
 * @ignore
 */
export function orderByProto<TKey, TSource>(
  this: IterableX<TSource>,
  keySelector: (item: TSource) => TKey,
  comparer?: (fst: TKey, snd: TKey) => number
): OrderedIterableX<TKey, TSource> {
  return orderBy<TKey, TSource>(keySelector, comparer)(this);
}

/**
 * @ignore
 */
export function orderByDescendingProto<TKey, TSource>(
  this: IterableX<TSource>,
  keySelector: (item: TSource) => TKey,
  comparer?: (fst: TKey, snd: TKey) => number
): OrderedIterableX<TKey, TSource> {
  return orderByDescending<TKey, TSource>(keySelector, comparer)(this);
}

IterableX.prototype.orderBy = orderByProto;
IterableX.prototype.orderByDescending = orderByDescendingProto;

export declare namespace iterable {
  let thenBy: typeof _thenBy;
  let thenByDescending: typeof _thenByDescending;
}

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    orderBy: typeof orderByProto;
    orderByDescending: typeof orderByDescendingProto;
  }
}
