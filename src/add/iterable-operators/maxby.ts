import { IterableX } from '../../iterable';
import { maxBy } from '../../iterable/maxby';

/**
 * @ignore
 */
export function maxByProto<TSource, TKey>(
    this: IterableX<TSource>,
    keyFn: (x: TSource) => TKey,
    cmp?: (x: TKey, y: TKey) => number): IterableX<TSource> {
  return maxBy(this, keyFn, cmp);
}

IterableX.prototype.maxBy = maxByProto;

declare module '../../iterable' {
  interface IterableX<T> {
    maxBy: typeof maxByProto;
  }
}