import { AsyncIterableX } from '../../asynciterable';
import { merge } from '../../asynciterable/merge';

/* tslint:disable:max-line-length */
export function mergeProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T>;
export function mergeProto<T, T2>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>
): AsyncIterableX<T | T2>;
export function mergeProto<T, T2, T3>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): AsyncIterableX<T | T2 | T3>;
export function mergeProto<T, T2, T3, T4>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): AsyncIterableX<T | T2 | T3 | T4>;
export function mergeProto<T, T2, T3, T4, T5>(
  this: AsyncIterableX<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): AsyncIterable<T | T2 | T3 | T4 | T5>;
export function mergeProto<T, T2, T3, T4, T5, T6>(
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
