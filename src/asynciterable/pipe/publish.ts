import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { publish as publishStatic } from '../publish';

export function publish<TSource>(): OperatorAsyncFunction<TSource, TSource>;
export function publish<TSource, TResult>(
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TResult>;
export function publish<TSource, TResult>(
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function publishOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return publishStatic(source, selector);
  };
}
