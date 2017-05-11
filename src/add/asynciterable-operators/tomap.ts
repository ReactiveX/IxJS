import { AsyncIterableX } from '../../asynciterable';
import { toMap } from '../../asynciterable/tomap';

export function toMapProto<TSource, TKey>(
    this: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey): Promise<Map<TKey, TSource>>;
export function toMapProto<TSource, TKey, TElement = TSource>(
    this: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Promise<Map<TKey, TElement>>;
export function toMapProto<TSource, TKey, TElement = TSource>(
    this: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Promise<Map<TKey, TElement | TSource>> {
  return toMap(this, keySelector, elementSelector);
}

AsyncIterableX.prototype.toMap = toMapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    toMap: typeof toMapProto;
  }
}