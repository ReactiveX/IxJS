import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { flatMap } from '../flatmap';

export function mergeAll<TSource>(): OperatorAsyncFunction<AsyncIterable<TSource>, TSource> {
  return function mergeAllOperatorFunction(
    source: AsyncIterable<AsyncIterable<TSource>>
  ): AsyncIterableX<TSource> {
    return flatMap(source, source => source);
  };
}
