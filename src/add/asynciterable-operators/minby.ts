import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { minBy } from '../../asynciterable/operators/minby';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
  this: AsyncIterableX<TSource>,
  keySelector: (x: TSource) => TKey | Promise<TKey>,
  comparer?: (x: TKey, y: TKey) => number | Promise<number>
): AsyncIterableX<TSource> {
  return minBy(keySelector, comparer)(this);
}

AsyncIterableX.prototype.minBy = minByProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    minBy: typeof minByProto;
  }
}
