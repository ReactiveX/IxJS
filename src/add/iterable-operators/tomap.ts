import { IterableX } from '../../iterable/iterablex.js';
import { toMap, ToMapOptions } from '../../iterable/tomap.js';

export function toMapProto<TSource, TKey, TElement = TSource>(
  this: IterableX<TSource>,
  options: ToMapOptions<TSource, TKey, TElement>
): Map<TKey, TElement | TSource> {
  return toMap(this, options);
}

IterableX.prototype.toMap = toMapProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    toMap: typeof toMapProto;
  }
}
