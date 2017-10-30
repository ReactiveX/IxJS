import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { SkipLastIterable } from '../skiplast';

export function skipLast<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function skipLastOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SkipLastIterable<TSource>(source, count);
  };
}
