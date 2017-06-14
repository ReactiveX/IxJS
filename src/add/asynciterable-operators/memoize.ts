import { AsyncIterableX } from '../../asynciterable';
import { memoize } from '../../asynciterable/memoize';

export function memoizeProto<TSource>(
    this: AsyncIterableX<TSource>,
    readerCount?: number): AsyncIterableX<TSource>;
export function memoizeProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
    readerCount?: number,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TResult>;
/**
 * @ignore
 */
export function memoizeProto<TSource, TResult = TSource>(
    this: AsyncIterableX<TSource>,
    readerCount: number = -1,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TSource | TResult> {
  return memoize(this, readerCount, selector);
}

AsyncIterableX.prototype.memoize = memoizeProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    memoize: typeof memoizeProto;
  }
}