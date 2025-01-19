import { throwIfAborted } from '../aborterror.js';
import { wrapWithAbort } from './operators/withabort.js';

export async function extremaBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  selector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  comparer: (left: TKey, right: TKey, signal?: AbortSignal) => number | Promise<number>,
  signal?: AbortSignal
): Promise<TSource[]> {
  throwIfAborted(signal);

  let hasValue = false;
  let key: TKey | undefined;
  let result: TSource[] = [];

  for await (const item of wrapWithAbort(source, signal)) {
    if (!hasValue) {
      key = await selector(item, signal);
      result.push(item);
      hasValue = true;
    } else {
      const currentKey = await selector(item, signal);
      const cmp = await comparer(currentKey, key as TKey, signal);

      if (cmp === 0) {
        result.push(item);
      } else if (cmp > 0) {
        result = [item];
        key = currentKey;
      }
    }
  }

  if (!hasValue) {
    throw new Error('Sequence contains no elements');
  }

  return result;
}
