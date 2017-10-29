import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { SliceAsyncIterable } from '../slice';

export function slice<TSource>(
  begin: number,
  end: number = Infinity
): MonoTypeOperatorAsyncFunction<TSource> {
  return function sliceOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new SliceAsyncIterable<TSource>(source, begin, end);
  };
}
