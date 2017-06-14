import { AsyncIterableX } from '../../asynciterable';
import { maxBy } from '../../asynciterable/maxby';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
    this: AsyncIterableX<TSource>,
    keySelector: (x: TSource) => TKey | Promise<TKey>,
    comparer?: (x: TKey, y: TKey) => number | Promise<number>): AsyncIterableX<TSource> {
  return maxBy(this, keySelector, comparer);
}

AsyncIterableX.prototype.maxBy = maxByProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    maxBy: typeof maxByProto;
  }
}