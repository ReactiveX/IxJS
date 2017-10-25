import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { SkipIterable } from '../skip';

export function skip<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function skipOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SkipIterable<TSource>(source, count);
  };
}
