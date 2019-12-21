import { IterableX } from '../../iterable/iterablex';
import { minBy } from '../../iterable/operators/minby';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
  this: IterableX<TSource>,
  keyFn: (x: TSource) => TKey,
  cmp?: (x: TKey, y: TKey) => number
): IterableX<TSource> {
  return minBy(keyFn, cmp)(this);
}

IterableX.prototype.minBy = minByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    minBy: typeof minByProto;
  }
}
