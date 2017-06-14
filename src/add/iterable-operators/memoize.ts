import { IterableX } from '../../iterable';
import { memoize } from '../../iterable/memoize';

export function memoizeProto<TSource>(
    this: IterableX<TSource>,
    readerCount?: number): IterableX<TSource>;
export function memoizeProto<TSource, TResult>(
    this: IterableX<TSource>,
    readerCount?: number,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult>;
/**
 * @ignore
 */
export function memoizeProto<TSource, TResult = TSource>(
    this: IterableX<TSource>,
    readerCount: number = -1,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  return memoize(this, readerCount, selector);
}

IterableX.prototype.memoize = memoizeProto;

declare module '../../iterable' {
  interface IterableX<T> {
    memoize: typeof memoizeProto;
  }
}