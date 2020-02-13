import { identityAsync } from '../util/identity';

export async function toMap<TSource, TKey>(
  source: AsyncIterable<TSource>,
  keySelector: (item: TSource) => TKey | Promise<TKey>
): Promise<Map<TKey, TSource>>;
export async function toMap<TSource, TKey, TElement = TSource>(
  source: AsyncIterable<TSource>,
  keySelector: (item: TSource) => TKey | Promise<TKey>,
  elementSelector?: (item: TSource) => TElement | Promise<TElement>
): Promise<Map<TKey, TElement>>;
export async function toMap<TSource, TKey, TElement = TSource>(
  source: AsyncIterable<TSource>,
  keySelector: (item: TSource) => TKey | Promise<TKey>,
  elementSelector: (item: TSource) => TElement | Promise<TElement> = identityAsync
): Promise<Map<TKey, TElement | TSource>> {
  const map = new Map<TKey, TElement | TSource>();
  for await (const item of source) {
    const value = await elementSelector(item);
    const key = await keySelector(item);
    map.set(key, value);
  }
  return map;
}
