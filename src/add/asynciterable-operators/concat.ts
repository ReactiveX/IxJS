import { AsyncIterableX } from '../../asynciterable';
import { concat } from '../../asynciterable/concat';

/* tslint:disable:max-line-length */
/**
 * @ignore
 */
export function concatProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T>;
/**
 * @ignore
 */
export function concatProto<T, T2>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>
): AsyncIterableX<T | T2>;
/**
 * @ignore
 */
export function concatProto<T, T2, T3>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): AsyncIterableX<T | T2 | T3>;
/**
 * @ignore
 */
export function concatProto<T, T2, T3, T4>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): AsyncIterableX<T | T2 | T3 | T4>;
/**
 * @ignore
 */
export function concatProto<T, T2, T3, T4, T5>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): AsyncIterable<T | T2 | T3 | T4 | T5>;
/**
 * @ignore
 */
export function concatProto<T, T2, T3, T4, T5, T6>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): AsyncIterable<T | T2 | T3 | T4 | T5 | T6>;
/* tslint:enable:max-line-length */

/**
 * @ignore
 */
export function concatProto<T>(
  this: AsyncIterableX<T>,
  ...args: AsyncIterable<T>[]
): AsyncIterableX<T> {
  return concat(this, ...args);
}

AsyncIterableX.prototype.concat = concatProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    concat: typeof concatProto;
  }
}
