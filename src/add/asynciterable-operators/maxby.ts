import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { maxBy } from '../../asynciterable/maxby';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  keySelector: (x: TSource) => TKey | Promise<TKey>,
  comparer?: (x: TKey, y: TKey) => number | Promise<number>
): AsyncIterableX<TSource> {
  return maxBy(this, keySelector, comparer);
}

AsyncIterableX.prototype.maxBy = maxByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    maxBy: typeof maxByProto;
  }
}
