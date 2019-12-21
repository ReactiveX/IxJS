import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { concatAll } from '../../asynciterable/operators/concatall';

/**
 * @ignore
 */
export function concatAllProto<T>(this: AsyncIterableX<AsyncIterable<T>>): AsyncIterableX<T> {
  return concatAll<T>()(this);
}

AsyncIterableX.prototype.concatAll = concatAllProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    concatAll: typeof concatAllProto;
  }
}
