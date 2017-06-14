import { AsyncIterableX } from '../../asynciterable';
import { concat } from '../../asynciterable/concat';

/**
 * @ignore
 */
export function concatProto<T>(this: AsyncIterableX<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return concat(this, ...args);
}

AsyncIterableX.prototype.concat = concatProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    concat: typeof concatProto;
  }
}