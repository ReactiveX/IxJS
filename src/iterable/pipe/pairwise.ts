import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { PairwiseIterable } from '../pairwise';

export function pairwise<TSource>(): OperatorFunction<TSource, TSource[]> {
  return function pairwiseOperatorFunction(source: Iterable<TSource>): IterableX<TSource[]> {
    return new PairwiseIterable<TSource>(source);
  };
}
