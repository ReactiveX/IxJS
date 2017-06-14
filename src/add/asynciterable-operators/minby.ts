import { AsyncIterableX } from '../../asynciterable';
import { minBy } from '../../asynciterable/minby';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
    this: AsyncIterableX<TSource>,
    keySelector: (x: TSource) => TKey | Promise<TKey>,
    comparer?: (x: TKey, y: TKey) => number | Promise<number>): AsyncIterableX<TSource> {
  return minBy(this, keySelector, comparer);
}

AsyncIterableX.prototype.minBy = minByProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    minBy: typeof minByProto;
  }
}