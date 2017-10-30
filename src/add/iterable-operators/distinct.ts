import { IterableX } from '../../iterable/iterablex';
import { distinct } from '../../iterable/distinct';

/**
 * @ignore
 */
export function distinctProto<TSource, TKey>(
  this: IterableX<TSource>,
  keySelector?: (value: TSource) => TKey,
  comparer?: (x: TKey, y: TKey) => boolean
): IterableX<TSource> {
  return distinct(this, keySelector, comparer);
}

IterableX.prototype.distinct = distinctProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    distinct: typeof distinctProto;
  }
}
