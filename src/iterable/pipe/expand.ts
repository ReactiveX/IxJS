import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { ExpandIterable } from '../expand';

export function expand<TSource>(
  selector: (value: TSource) => Iterable<TSource>
): MonoTypeOperatorFunction<TSource> {
  return function expandOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new ExpandIterable<TSource>(source, selector);
  };
}
