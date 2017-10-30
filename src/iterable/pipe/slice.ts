import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { SliceIterable } from '../slice';

export function slice<TSource>(
  begin: number,
  end: number = Infinity
): MonoTypeOperatorFunction<TSource> {
  return function sliceOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SliceIterable<TSource>(source, begin, end);
  };
}
