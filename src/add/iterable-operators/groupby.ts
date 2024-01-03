import { IterableX } from '../../iterable/iterablex.js';
import { groupBy, GroupedIterable } from '../../iterable/operators/groupby.js';
import { identity } from '../../util/identity.js';

export function groupByProto<TSource, TKey>(
  this: IterableX<TSource>,
  keySelector: (value: TSource) => TKey
): IterableX<GroupedIterable<TKey, TSource>>;
export function groupByProto<TSource, TKey, TValue>(
  this: IterableX<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue
): IterableX<GroupedIterable<TKey, TValue>>;
export function groupByProto<TSource, TKey, TValue>(
  this: IterableX<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue = identity
): IterableX<GroupedIterable<TKey, TValue>> {
  return groupBy<TSource, TKey, TValue>(keySelector, elementSelector)(this);
}

IterableX.prototype.groupBy = groupByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    groupBy: typeof groupByProto;
  }
}
