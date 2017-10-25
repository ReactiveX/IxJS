import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { BufferIterable } from '../buffer';

export function buffer<TSource>(
  count: number,
  skip?: number
): OperatorFunction<TSource, TSource[]> {
  if (skip == null) {
    skip = count;
  }
  return function bufferOperatorFunction(source: Iterable<TSource>): IterableX<TSource[]> {
    return new BufferIterable(source, count, skip!);
  };
}
