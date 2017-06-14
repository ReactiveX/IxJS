import { AsyncIterableX } from '../../asynciterable';
import { toMap } from '../../asynciterable/tomap';

export function toMapProto<TSource, TKey>(
    this: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey | Promise<TKey>): Promise<Map<TKey, TSource>>;
export function toMapProto<TSource, TKey, TElement = TSource>(
    this: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey | Promise<TKey>,
    elementSelector?: (item: TSource) => TElement | Promise<TElement>): Promise<Map<TKey, TElement>>;
/**
 * @ignore
 */
export function toMapProto<TSource, TKey, TElement = TSource>(
    this: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey | Promise<TKey>,
    elementSelector?: (item: TSource) => TElement | Promise<TElement>): Promise<Map<TKey, TElement | TSource>> {
  return toMap(this, keySelector, elementSelector);
}

AsyncIterableX.prototype.toMap = toMapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    toMap: typeof toMapProto;
  }
}