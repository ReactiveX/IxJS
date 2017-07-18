/**
 * @ignore
 */
export async function createGrouping<TSource, TKey, TValue>(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey>,
    elementSelector: (value: TSource) => TValue | Promise<TValue>): Promise<Map<TKey, TValue[]>> {
  let map = new Map<TKey, TValue[]>();
  for await (let item of source) {
    let key = await keySelector(item);
    let grouping = map.get(key);
    if (!map.has(key)) {
      grouping = [];
      map.set(key, grouping);
    }
    let element = await elementSelector(item);
    grouping!.push(element);
  }

  return map;
}
