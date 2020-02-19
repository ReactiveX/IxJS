/**
 * @ignore
 */
export async function createGrouping<TSource, TKey, TValue>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector: (value: TSource) => TValue | Promise<TValue>
): Promise<Map<TKey, TValue[]>> {
  const map = new Map<TKey, TValue[]>();
  for await (const item of source) {
    const key = await keySelector(item);
    let grouping = map.get(key);
    if (!map.has(key)) {
      grouping = [];
      map.set(key, grouping);
    }
    const element = await elementSelector(item);
    grouping!.push(element);
  }

  return map;
}
