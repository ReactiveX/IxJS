import { identityAsync } from '../internal/identity';

export async function toMap<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey | Promise<TKey>): Promise<Map<TKey, TSource>>;
export async function toMap<TSource, TKey, TElement = TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey | Promise<TKey>,
    elementSelector?: (item: TSource) => TElement | Promise<TElement>): Promise<Map<TKey, TElement>>;
export async function toMap<TSource, TKey, TElement = TSource>(
    source: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey | Promise<TKey>,
    elementSelector: (item: TSource) => TElement | Promise<TElement> = identityAsync):
    Promise<Map<TKey, TElement | TSource>> {
  let map = new Map<TKey, TElement | TSource>();
  for await (let item of source) {
    let value = await elementSelector(item);
    let key = await keySelector(item);
    map.set(key, value);
  }
  return map;
}
