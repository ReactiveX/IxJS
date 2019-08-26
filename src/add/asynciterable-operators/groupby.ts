import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import {
  groupBy,
  groupByResultIdentityAsync,
  GroupedAsyncIterable
} from '../../asynciterable/operators/groupby';
import { identityAsync } from '../../util/identity';

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
  return groupBy<TSource, TKey, TValue, TResult>(keySelector, elementSelector, resultSelector)(
    this
  );
}

AsyncIterableX.prototype.groupBy = groupByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    groupBy: typeof groupByProto;
  }
}
