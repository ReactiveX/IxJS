import { IterableX } from '../../iterable/iterablex';
import { minBy } from '../../iterable/minby';

/**
 * @ignore
 */
export function minByProto<TSource, TKey>(
  this: IterableX<TSource>,
  keyFn: (x: TSource) => TKey,
  cmp?: (x: TKey, y: TKey) => number
): IterableX<TSource> {
  return minBy(this, keyFn, cmp);
}

IterableX.prototype.minBy = minByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    minBy: typeof minByProto;
  }
}
