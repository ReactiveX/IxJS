export function toMap<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (item: TSource) => TKey): Map<TKey, TSource>;
export function toMap<TSource, TKey, TElement = TSource>(
    source: Iterable<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Map<TKey, TElement>;
export function toMap<TSource, TKey, TElement = TSource>(
    source: Iterable<TSource>,
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement): Map<TKey, TElement | TSource> {
  let map = new Map<TKey, TElement | TSource>();
  for (let item of source) {
    let value = elementSelector ? elementSelector(item) : item;
    map.set(keySelector(item), value);
  }
  return map;
}
