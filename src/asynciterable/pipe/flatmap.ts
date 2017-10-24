import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { FlatMapAsyncIterable } from '../flatmap';
import { bindCallback } from '../../internal/bindcallback';

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult> {
  return function flatMapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new FlatMapAsyncIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 1));
  };
}
