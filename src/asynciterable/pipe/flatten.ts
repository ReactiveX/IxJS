import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { FlattenAsyncIterable } from '../flatten';

export function flatten<T>(depth: number = Infinity): MonoTypeOperatorAsyncFunction<T> {
  return function flattenOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new FlattenAsyncIterable<T>(source, depth);
  };
}
