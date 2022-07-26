import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { mergeAll } from '../../asynciterable/operators/mergeall';

/**
 * @ignore
 */
export function mergeAllProto<T>(
  this: AsyncIterableX<AsyncIterable<T>>,
  concurrent = Infinity
): AsyncIterableX<T> {
  return mergeAll(concurrent)(this);
}

AsyncIterableX.prototype.mergeAll = mergeAllProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    mergeAll: typeof mergeAllProto;
  }
}
