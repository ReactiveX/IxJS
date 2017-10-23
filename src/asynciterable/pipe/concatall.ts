import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { ConcatAllAsyncIterable } from '../concatall';

export function concatAll<T>(): OperatorAsyncFunction<AsyncIterable<T>, T> {
  return function concatAllOperatorFunction(source: AsyncIterable<AsyncIterable<T>>): AsyncIterableX<T> {
    return new ConcatAllAsyncIterable<T>(source);
  };
}
