import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { memoize as memoizeStatic } from '../memoize';

export function memoize<TSource>(readerCount?: number): OperatorFunction<TSource, TSource>;
export function memoize<TSource, TResult>(
  readerCount?: number,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
export function memoize<TSource, TResult = TSource>(
  readerCount: number = -1,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function memoizeOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return memoizeStatic(source, readerCount, selector);
  };
}
