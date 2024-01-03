import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { ConcatAllAsyncIterable } from '../../asynciterable/operators/concatall.js';

/**
 * @ignore
 */
export function concatAllProto<T>(this: AsyncIterableX<AsyncIterable<T>>): AsyncIterableX<T> {
  return new ConcatAllAsyncIterable<T>(this);
}

AsyncIterableX.prototype.concatAll = concatAllProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    concatAll: typeof concatAllProto;
  }
}
