import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { memoize } from '../../asynciterable/operators/memoize.js';

export function memoizeProto<T>(this: AsyncIterableX<T>, readerCount?: number): AsyncIterableX<T>;
export function memoizeProto<T, R>(
  this: AsyncIterableX<T>,
  readerCount?: number,
  selector?: (value: AsyncIterable<T>, signal?: AbortSignal) => AsyncIterable<R>
): AsyncIterableX<R>;
/**
 * @ignore
 */
export function memoizeProto<T, R = T>(
  this: AsyncIterableX<T>,
  readerCount = -1,
  selector?: (value: AsyncIterable<T>, signal?: AbortSignal) => AsyncIterable<R>
): AsyncIterableX<T | R> {
  return memoize(readerCount, selector)(this);
}

AsyncIterableX.prototype.memoize = memoizeProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    memoize: typeof memoizeProto;
  }
}
