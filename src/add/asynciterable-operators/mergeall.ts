import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { mergeAll } from '../../asynciterable/operators/mergeall.js';

/**
 * @ignore
 */
export function mergeAllProto<T>(
  this: AsyncIterableX<AsyncIterable<T>>,
  concurrent = Infinity
): AsyncIterableX<T> {
  return mergeAll<T>(concurrent)(this);
}

AsyncIterableX.prototype.mergeAll = mergeAllProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    mergeAll: typeof mergeAllProto;
  }
}
