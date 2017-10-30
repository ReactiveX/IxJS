import { IterableX } from '../../iterable/iterablex';
import { pairwise } from '../../iterable/pairwise';

/**
 * @ignore
 */
export function pairwiseProto<TSource>(this: IterableX<TSource>): IterableX<TSource[]> {
  return pairwise(this);
}

IterableX.prototype.pairwise = pairwiseProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    pairwise: typeof pairwiseProto;
  }
}
