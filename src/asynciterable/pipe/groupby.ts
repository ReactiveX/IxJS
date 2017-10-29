import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { GroupByAsyncIterable, GroupedAsyncIterable, groupByResultIdentityAsync } from '../groupby';
import { identityAsync } from '../../internal/identity';

export function groupBy<TSource, TKey>(
  keySelector: (value: TSource) => TKey | Promise<TKey>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TValue>>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>,
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>
): OperatorAsyncFunction<TSource, TResult>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector: (value: TSource) => TValue | Promise<TValue> = identityAsync,
  resultSelector: (
    key: TKey,
    values: Iterable<TValue>
  ) => TResult | Promise<TResult> = groupByResultIdentityAsync
): OperatorAsyncFunction<TSource, TResult> {
  return function groupByOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new GroupByAsyncIterable<TSource, TKey, TValue, TResult>(
      source,
      keySelector,
      elementSelector,
      resultSelector
    );
  };
}
