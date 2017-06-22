import { IterableX } from '../../iterable';
import { pairwise } from '../../iterable/pairwise';

/**
 * @ignore
 */
export function pairwiseProto<TSource>(
    this: IterableX<TSource>): IterableX<TSource[]> {
  return pairwise(this);
}

IterableX.prototype.pairwise = pairwiseProto;

declare module '../../iterable' {
  interface IterableX<T> {
    pairwise: typeof pairwiseProto;
  }
}