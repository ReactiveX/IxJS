import { AsyncIterableX } from '../../asynciterable';
import {
  groupBy,
  groupByResultIdentityAsync,
  GroupedAsyncIterable
} from '../../asynciterable/groupby';
import { identityAsync } from '../../internal/identity';

export function groupByProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>
): AsyncIterableX<GroupedAsyncIterable<TKey, TSource>>;
export function groupByProto<TSource, TKey, TValue>(
  this: AsyncIterableX<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>
): AsyncIterableX<GroupedAsyncIterable<TKey, TValue>>;
export function groupByProto<TSource, TKey, TValue, TResult>(
  this: AsyncIterableX<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>,
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>
): AsyncIterableX<TResult>;
/**
 * @ignore
 */
export function groupByProto<TSource, TKey, TValue, TResult>(
  this: AsyncIterableX<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector: (value: TSource) => TValue | Promise<TValue> = identityAsync,
  resultSelector: (
    key: TKey,
    values: Iterable<TValue>
  ) => TResult | Promise<TResult> = groupByResultIdentityAsync
): AsyncIterableX<TResult> {
  return groupBy<TSource, TKey, TValue, TResult>(
    this,
    keySelector,
    elementSelector,
    resultSelector
  );
}

AsyncIterableX.prototype.groupBy = groupByProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    groupBy: typeof groupByProto;
  }
}
