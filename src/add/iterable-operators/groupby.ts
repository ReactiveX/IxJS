import { IterableX } from '../../iterable';
import { groupBy, GroupedIterable, groupByResultIdentity } from '../../iterable/groupby';
import { identity } from '../../internal/identity';

export function groupByProto<TSource, TKey>(
  this: IterableX<TSource>,
  keySelector: (value: TSource) => TKey
): IterableX<GroupedIterable<TKey, TSource>>;
export function groupByProto<TSource, TKey, TValue>(
  this: IterableX<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue
): IterableX<GroupedIterable<TKey, TValue>>;
export function groupByProto<TSource, TKey, TValue, TResult>(
  this: IterableX<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>,
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult
): IterableX<TResult>;
/**
 * @ignore
 */
export function groupByProto<TSource, TKey, TValue, TResult>(
  this: IterableX<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue = identity,
  resultSelector: (key: TKey, values: Iterable<TValue>) => TResult = groupByResultIdentity
): IterableX<TResult> {
  return groupBy<TSource, TKey, TValue, TResult>(
    this,
    keySelector,
    elementSelector,
    resultSelector
  );
}

IterableX.prototype.groupBy = groupByProto;

declare module '../../iterable' {
  interface IterableX<T> {
    groupBy: typeof groupByProto;
  }
}
