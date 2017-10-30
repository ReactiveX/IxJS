import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { IgnoreElementsIterable } from '../ignoreelements';

export function ignoreElements<TSource>(): MonoTypeOperatorFunction<TSource> {
  return function ignoreElementsOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new IgnoreElementsIterable<TSource>(source);
  };
}
