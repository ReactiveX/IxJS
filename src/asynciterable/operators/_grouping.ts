import { wrapWithAbort } from './withabort';
import { AbortError } from '../../util/aborterror';

/**
 * @ignore
 */
export async function createGrouping<TSource, TKey, TValue>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector: (value: TSource) => TValue | Promise<TValue>,
  signal?: AbortSignal
): Promise<Map<TKey, TValue[]>> {
  const map = new Map<TKey, TValue[]>();
  for await (const item of wrapWithAbort(source, signal)) {
    const key = await keySelector(item);
    if (signal?.aborted) {
      throw new AbortError();
    }

    let grouping = map.get(key);
    if (!map.has(key)) {
      grouping = [];
      map.set(key, grouping);
    }
    const element = await elementSelector(item);
    if (signal?.aborted) {
      throw new AbortError();
    }

    grouping!.push(element);
  }

  return map;
}
