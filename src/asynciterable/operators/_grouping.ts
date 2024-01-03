import { wrapWithAbort } from './withabort.js';

/**
 * @ignore
 */
export async function createGrouping<TSource, TKey, TValue>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  elementSelector: (value: TSource, signal?: AbortSignal) => TValue | Promise<TValue>,
  signal?: AbortSignal
): Promise<Map<TKey, TValue[]>> {
  const map = new Map<TKey, TValue[]>();
  for await (const item of wrapWithAbort(source, signal)) {
    const key = await keySelector(item, signal);
    let grouping = map.get(key);
    if (!map.has(key)) {
      grouping = [];
      map.set(key, grouping);
    }
    const element = await elementSelector(item, signal);
    grouping!.push(element);
  }

  return map;
}
