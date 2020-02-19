import { AsyncIterableX } from '../asynciterablex';
import { as } from '../as';
import { flatMap } from './flatmap';
import { OperatorAsyncFunction } from '../../interfaces';

export function mergeAll<TSource>(): OperatorAsyncFunction<AsyncIterable<TSource>, TSource> {
  return function mergeAllOperatorFunction(
    source: AsyncIterable<AsyncIterable<TSource>>
  ): AsyncIterableX<TSource> {
    return as(source).pipe(flatMap<AsyncIterable<TSource>, TSource>(s => s));
  };
}
