import { wrapWithAbort } from './operators/withabort';

export async function extremaBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  selector: (item: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  comparer: (left: TKey, right: TKey) => number | Promise<number>,
  signal?: AbortSignal
): Promise<TSource[]> {
  let result = [];
  const it = wrapWithAbort(source, signal)[Symbol.asyncIterator]();
  const { value, done } = await it.next();
  if (done) {
    throw new Error('Sequence contains no elements');
  }

  let resKey = await selector(value, signal);
  result.push(value);

  let next: IteratorResult<TSource>;
  while (!(next = await it.next()).done) {
    const { value: current } = next;
    const key = await selector(current, signal);
    const cmp = await comparer(key, resKey);

    if (cmp === 0) {
      result.push(current);
    } else if (cmp > 0) {
      result = [current];
      resKey = key;
    }
  }

  return result;
}
