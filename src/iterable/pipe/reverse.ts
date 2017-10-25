import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { ReverseIterable } from '../reverse';

export function reverse<TSource>(): MonoTypeOperatorFunction<TSource> {
  return function reverseOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new ReverseIterable<TSource>(source);
  };
}
