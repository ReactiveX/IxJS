import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import {
  GroupByAsyncIterable,
  GroupedAsyncIterable,
} from '../../asynciterable/operators/groupby.js';
import { identityAsync } from '../../util/identity.js';

export function groupByProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>
): AsyncIterableX<GroupedAsyncIterable<TKey, TSource>>;
export function groupByProto<TSource, TKey, TValue>(
  this: AsyncIterableX<TSource>,
  keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource, signal?: AbortSignal) => TValue | Promise<TValue>
): AsyncIterableX<GroupedAsyncIterable<TKey, TValue>>;
export function groupByProto<TSource, TKey, TValue>(
  this: AsyncIterableX<TSource>,
  keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  elementSelector: (
    value: TSource,
    signal?: AbortSignal
  ) => TValue | Promise<TValue> = identityAsync
): AsyncIterableX<GroupedAsyncIterable<TKey, TValue>> {
  return new GroupByAsyncIterable<TSource, TKey, TValue>(this, keySelector, elementSelector);
}

AsyncIterableX.prototype.groupBy = groupByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    groupBy: typeof groupByProto;
  }
}
