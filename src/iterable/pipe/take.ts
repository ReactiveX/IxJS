import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { TakeIterable } from '../take';

export function take<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function takeOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TakeIterable<TSource>(source, count);
  };
}
