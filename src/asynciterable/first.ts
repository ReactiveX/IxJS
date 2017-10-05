import { booleanAsyncPredicate } from '../internal/predicates';

export async function first<T>(
    source: AsyncIterable<T>,
    predicate: booleanAsyncPredicate<T> = async () => true): Promise<T | undefined> {
  let i = 0;
  for await (let item of source) {
    if (await predicate(item, i++)) {
      return item;
    }
  }

  return undefined;
}
