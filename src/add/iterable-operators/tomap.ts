import { IterableX } from '../../iterable';
import { toMap } from '../../iterable/tomap';

export function toMapProto<TSource, TKey>(
    this: IterableX<TSource>,
    keySelector: (item: TSource) => TKey): Map<TKey, TSource>;
export function toMapProto<TSource, TKey, TElement = TSource>(
    this: IterableX<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Map<TKey, TElement>;
/**
 * @ignore
 */
export function toMapProto<TSource, TKey, TElement = TSource>(
    this: IterableX<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Map<TKey, TElement | TSource> {
  return toMap(this, keySelector, elementSelector);
}

IterableX.prototype.toMap = toMapProto;

declare module '../../iterable' {
  interface IterableX<T> {
    toMap: typeof toMapProto;
  }
}