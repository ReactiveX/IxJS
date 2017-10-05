import { booleanAsyncPredicate } from '../internal/predicates';

export async function every<T>(
    source: AsyncIterable<T>,
    comparer: booleanAsyncPredicate<T>): Promise<boolean> {
  let i = 0;
  for await (let item of source) {
    if (!await comparer(item, i++)) { return false; }
  }
  return true;
}
