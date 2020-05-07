import { IterableX } from '../../iterable/iterablex';
import { toMap, ToMapOptions } from '../../iterable/tomap';

export function toMapProto<TSource, TKey, TElement = TSource>(
  this: IterableX<TSource>,
  keySelector: (item: TSource) => TKey,
  options?: ToMapOptions<TSource, TElement>
): Map<TKey, TElement | TSource> {
  return toMap(this, keySelector, options);
}

IterableX.prototype.toMap = toMapProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    toMap: typeof toMapProto;
  }
}
