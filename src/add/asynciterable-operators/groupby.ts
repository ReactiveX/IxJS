import { AsyncIterableX } from '../../asynciterable';
import { groupBy, GroupedAsyncIterable } from '../../asynciterable/groupby';
import { identity } from '../../internal/identity';

export function groupByProto<TSource, TKey>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource) => TKey): AsyncIterableX<GroupedAsyncIterable<TKey, TSource>>;
export function groupByProto<TSource, TKey, TValue>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue): AsyncIterableX<GroupedAsyncIterable<TKey, TValue>>;
export function groupByProto<TSource, TKey, TValue>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue = identity): AsyncIterableX<GroupedAsyncIterable<TKey, TValue>> {
  return groupBy<TSource, TKey, TValue>(source, keySelector, elementSelector);
}

AsyncIterableX.prototype.groupBy = groupByProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    groupBy: typeof groupByProto;
  }
}