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
    const element = await elementSelector(item, signal);

    if (grouping === undefined) {
      grouping = [];
      map.set(key, grouping);
    }

    grouping.push(element);
  }

  return map;
}
