import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { concatAll } from '../../asynciterable/concatall';

/**
 * @ignore
 */
export function concatAllProto<T>(this: AsyncIterableX<AsyncIterable<T>>): AsyncIterableX<T> {
  return concatAll(this);
}

AsyncIterableX.prototype.concatAll = concatAllProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    concatAll: typeof concatAllProto;
  }
}
