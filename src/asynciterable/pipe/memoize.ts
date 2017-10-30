import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { memoize as memoizeStatic } from '../memoize';

export function memoize<TSource>(readerCount?: number): OperatorAsyncFunction<TSource, TSource>;
export function memoize<TSource, TResult>(
  readerCount?: number,
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TResult>;
export function memoize<TSource, TResult = TSource>(
  readerCount: number = -1,
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function memoizeOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return memoizeStatic(source, readerCount, selector);
  };
}
