import { IterableX } from '../../iterable/iterablex';
import { PairwiseIterable } from '../../iterable/operators/pairwise';

/**
 * @ignore
 */
export function pairwiseProto<T>(this: IterableX<T>): IterableX<T[]> {
  return new PairwiseIterable<T>(this);
}

IterableX.prototype.pairwise = pairwiseProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    pairwise: typeof pairwiseProto;
  }
}
