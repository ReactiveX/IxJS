import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { PairwiseAsyncIterable } from '../pairwise';

export function pairwise<TSource>(): OperatorAsyncFunction<TSource, TSource[]> {
  return function pairwiseOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource[]> {
    return new PairwiseAsyncIterable<TSource>(source);
  };
}
