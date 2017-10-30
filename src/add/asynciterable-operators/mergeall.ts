import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { mergeAll } from '../../asynciterable/mergeall';

/**
 * @ignore
 */
export function mergeAllProto<T>(this: AsyncIterableX<AsyncIterable<T>>): AsyncIterableX<T> {
  return mergeAll(this);
}

AsyncIterableX.prototype.mergeAll = mergeAllProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    mergeAll: typeof mergeAllProto;
  }
}
