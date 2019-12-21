import { IterableX } from '../../iterable/iterablex';
import { maxBy } from '../../iterable/operators/maxby';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
  this: IterableX<TSource>,
  keyFn: (x: TSource) => TKey,
  cmp?: (x: TKey, y: TKey) => number
): IterableX<TSource> {
  return maxBy(keyFn, cmp)(this);
}

IterableX.prototype.maxBy = maxByProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    maxBy: typeof maxByProto;
  }
}
