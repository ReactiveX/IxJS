import { ExtremaOptions } from './extremaoptions';

export function extremaBy<TSource, TKey>(
  source: Iterable<TSource>,
  options: ExtremaOptions<TSource, TKey>
): TSource[] {
  const { ['comparer']: comparer, ['selector']: selector } = options;
  let result = [];
  const it = source[Symbol.iterator]();
  const { value, done } = it.next();
  if (done) {
    throw new Error('Sequence contains no elements');
  }

  let resKey = selector(value);
  result.push(value);

  let next: IteratorResult<TSource>;
  while (!(next = it.next()).done) {
    const { value: current } = next;
    const key = selector(current);
    const cmp = comparer!(resKey, key);

    if (cmp === 0) {
      result.push(current);
    } else if (cmp > 0) {
      result = [current];
      resKey = key;
    }
  }

  return result;
}
