import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { GroupByIterable, GroupedIterable, groupByResultIdentity } from '../groupby';
import { identity } from '../../internal/identity';

export function groupBy<TSource, TKey>(
  keySelector: (value: TSource) => TKey
): OperatorFunction<TSource, GroupedIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue
): OperatorFunction<TSource, GroupedIterable<TKey, TValue>>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue,
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult
): OperatorFunction<TSource, TResult>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue = identity,
  resultSelector: (key: TKey, values: Iterable<TValue>) => TResult = groupByResultIdentity
): OperatorFunction<TSource, TResult> {
  return function groupByOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new GroupByIterable<TSource, TKey, TValue, TResult>(
      source,
      keySelector,
      elementSelector,
      resultSelector
    );
  };
}
