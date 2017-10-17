import { AsyncIterableX } from '../../asynciterable';
import { merge } from '../../asynciterable/merge';

/**
 * @ignore
 */
export function mergeProto<T>(
  this: AsyncIterableX<T>,
  ...args: AsyncIterable<T>[]
): AsyncIterableX<T> {
  return merge(this, ...args);
}

AsyncIterableX.prototype.merge = mergeProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    merge: typeof mergeProto;
  }
}
