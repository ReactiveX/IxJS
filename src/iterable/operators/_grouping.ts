/**
 * @ignore
 */
export function createGrouping<TSource, TKey, TValue>(
  source: Iterable<TSource>,
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue
): Map<TKey, TValue[]> {
  const map = new Map<TKey, TValue[]>();
  for (const item of source) {
    const key = keySelector(item);
    let grouping = map.get(key);
    if (!map.has(key)) {
      grouping = [];
      map.set(key, grouping);
    }
    grouping!.push(elementSelector(item));
  }

  return map;
}
