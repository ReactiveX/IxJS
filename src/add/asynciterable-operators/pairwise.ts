import { AsyncIterableX } from '../../asynciterable';
import { pairwise } from '../../asynciterable/pairwise';

/**
 * @ignore
 */
export function pairwiseProto<TSource>(
    this: AsyncIterableX<TSource>): AsyncIterableX<TSource[]> {
  return pairwise(this);
}

AsyncIterableX.prototype.pairwise = pairwiseProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    pairwise: typeof pairwiseProto;
  }
}