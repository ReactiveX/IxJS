import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { RepeatIterable } from '../repeat';

export function repeat<TSource>(count: number = -1): MonoTypeOperatorFunction<TSource> {
  return function repeatOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new RepeatIterable<TSource>(source, count);
  };
}
