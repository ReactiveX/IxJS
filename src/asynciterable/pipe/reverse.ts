import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { ReverseAsyncIterable } from '../reverse';

export function reverse<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function reverseOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ReverseAsyncIterable<TSource>(source);
  };
}
