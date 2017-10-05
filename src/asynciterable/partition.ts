import { AsyncIterableX } from '../asynciterable';
import { filter } from './filter';
import { booleanAsyncPredicate } from '../internal/predicates';

export function partition<TSource>(
    source: AsyncIterable<TSource>,
    predicate: booleanAsyncPredicate<TSource>,
    thisArg?: any): AsyncIterableX<TSource>[] {
  return [
    filter(source, predicate, thisArg),
    filter(source, (x, i) => !predicate(x, i), thisArg)
  ];
}
