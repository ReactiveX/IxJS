import { MonoTypeOperatorFunction } from '../../interfaces';
import { OrderedIterableX, OrderedIterableBaseX } from '../orderby';
import { sorter as defaultSorter } from '../../internal/sorter';

export function orderBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): MonoTypeOperatorFunction<TSource> {
  return function orderByOperatorFunction(source: Iterable<TSource>) {
    return new OrderedIterableX<TKey, TSource>(source, keySelector, comparer, false);
  };
}

export function orderByDescending<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): MonoTypeOperatorFunction<TSource> {
  return function orderByDescendingOperatorFunction(source: Iterable<TSource>) {
    return new OrderedIterableX<TKey, TSource>(source, keySelector, comparer, true);
  };
}

export function thenBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): MonoTypeOperatorFunction<TSource> {
  return function thenByOperatorFunction(source: Iterable<TSource>) {
    const orderSource = <OrderedIterableBaseX<TSource>>source;
    return new OrderedIterableX<TKey, TSource>(
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
): MonoTypeOperatorFunction<TSource> {
  return function thenByDescendingOperatorFunction(source: Iterable<TSource>) {
    const orderSource = <OrderedIterableBaseX<TSource>>source;
    return new OrderedIterableX<TKey, TSource>(
      orderSource._source,
      keySelector,
      comparer,
      true,
      orderSource
    );
  };
}
