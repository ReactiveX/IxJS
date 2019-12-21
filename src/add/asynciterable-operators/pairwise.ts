import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { pairwise } from '../../asynciterable/operators/pairwise';

/**
 * @ignore
 */
export function pairwiseProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T[]> {
  return pairwise<T>()(this);
}

AsyncIterableX.prototype.pairwise = pairwiseProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    pairwise: typeof pairwiseProto;
  }
}
