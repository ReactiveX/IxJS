import { AsyncIterableX } from '../../asynciterable';
import { concatAll } from '../../asynciterable/concat';

/**
 * @ignore
 */
export function concatAllProto<T>(this: AsyncIterableX<AsyncIterable<T>>): AsyncIterableX<T> {
  return concatAll(this);
}

AsyncIterableX.prototype.concatAll = concatAllProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    concatAll: typeof concatAllProto;
  }
}