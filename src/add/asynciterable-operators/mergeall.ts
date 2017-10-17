import { AsyncIterableX } from '../../asynciterable';
import { mergeAll } from '../../asynciterable/mergeall';

/**
 * @ignore
 */
export function mergeAllProto<T>(this: AsyncIterableX<AsyncIterable<T>>): AsyncIterableX<T> {
  return mergeAll(this);
}

AsyncIterableX.prototype.mergeAll = mergeAllProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    mergeAll: typeof mergeAllProto;
  }
}
