import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { OrderedAsyncIterableX, OrderedAsyncIterableBaseX } from '../orderby';
import { sorter as defaultSorter } from '../../internal/sorter';

export function orderBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): MonoTypeOperatorAsyncFunction<TSource> {
  return function orderByOperatorFunction(source: AsyncIterable<TSource>) {
    return new OrderedAsyncIterableX<TKey, TSource>(source, keySelector, comparer, false);
  };
}

export function orderByDescending<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): MonoTypeOperatorAsyncFunction<TSource> {
  return function orderByDescendingOperatorFunction(source: AsyncIterable<TSource>) {
    return new OrderedAsyncIterableX<TKey, TSource>(source, keySelector, comparer, true);
  };
}

export function thenBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): MonoTypeOperatorAsyncFunction<TSource> {
  return function thenByOperatorFunction(source: AsyncIterable<TSource>) {
    const orderSource = <OrderedAsyncIterableBaseX<TSource>>source;
    return new OrderedAsyncIterableX<TKey, TSource>(
      orderSource._source,
      keySelector,
      comparer,
      false,
      orderSource
    );
  };
}

export function thenByDescending<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): MonoTypeOperatorAsyncFunction<TSource> {
  return function thenByDescendingOperatorFunction(source: AsyncIterable<TSource>) {
    const orderSource = <OrderedAsyncIterableBaseX<TSource>>source;
    return new OrderedAsyncIterableX<TKey, TSource>(
      orderSource._source,
      keySelector,
      comparer,
      true,
      orderSource
    );
  };
}
