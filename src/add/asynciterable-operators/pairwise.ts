import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { PairwiseAsyncIterable } from '../../asynciterable/operators/pairwise';

/**
 * @ignore
 */
export function pairwiseProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T[]> {
  return new PairwiseAsyncIterable<T>(this);
}

AsyncIterableX.prototype.pairwise = pairwiseProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    pairwise: typeof pairwiseProto;
  }
}
