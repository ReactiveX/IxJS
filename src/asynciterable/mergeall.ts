import { AsyncIterableX } from './asynciterablex';
import { flatMap } from './flatmap';
import { OperatorAsyncFunction } from '../interfaces';

export function mergeAll<TSource>(): OperatorAsyncFunction<AsyncIterable<TSource>, TSource> {
  return function mergeAllOperatorFunction(
    source: AsyncIterable<AsyncIterable<TSource>>
  ): AsyncIterableX<TSource> {
    return flatMap<AsyncIterable<TSource>, TSource>(source, source => source);
  };
}
