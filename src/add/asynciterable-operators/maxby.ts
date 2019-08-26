import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { maxBy } from '../../asynciterable/operators/maxby';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  keySelector: (x: TSource) => TKey | Promise<TKey>,
  comparer?: (x: TKey, y: TKey) => number | Promise<number>
): AsyncIterableX<TSource> {
  return maxBy(keySelector, comparer)(this);
}

AsyncIterableX.prototype.maxBy = maxByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    maxBy: typeof maxByProto;
  }
}
