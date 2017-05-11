'use strict';

export async function toMap<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey): Promise<Map<TKey, TSource>>;
export async function toMap<TSource, TKey, TElement = TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Promise<Map<TKey, TElement>>;
export async function toMap<TSource, TKey, TElement = TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Promise<Map<TKey, TElement | TSource>> {
  let map = new Map<TKey, TElement | TSource>();
  for await (let item of source) {
    let value = elementSelector ? elementSelector(item) : item;
    map.set(keySelector(item), value);
  }
  return map;
}