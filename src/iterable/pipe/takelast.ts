import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { TakeLastIterable } from '../takelast';

export function takeLast<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function takeLastOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TakeLastIterable<TSource>(source, count);
  };
}
