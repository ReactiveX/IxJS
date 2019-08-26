import { IterableX } from '../../iterable/iterablex';
import { pairwise } from '../../iterable/operators/pairwise';

/**
 * @ignore
 */
export function pairwiseProto<T>(this: IterableX<T>): IterableX<T[]> {
  return pairwise<T>()(this);
}

IterableX.prototype.pairwise = pairwiseProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    pairwise: typeof pairwiseProto;
  }
}
