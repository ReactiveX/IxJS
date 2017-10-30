import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { BufferAsyncIterable } from '../buffer';

export function buffer<TSource>(
  count: number,
  skip?: number
): OperatorAsyncFunction<TSource, TSource[]> {
  if (skip == null) {
    skip = count;
  }
  return function bufferOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource[]> {
    return new BufferAsyncIterable<TSource>(source, count, skip!);
  };
}
