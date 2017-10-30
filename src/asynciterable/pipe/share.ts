import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { share as shareStatic } from '../share';

export function share<TSource>(): OperatorAsyncFunction<TSource, TSource>;
export function share<TSource, TResult>(
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TResult>;
export function share<TSource, TResult = TSource>(
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function shareOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return shareStatic<TSource, TResult>(source, selector);
  };
}
