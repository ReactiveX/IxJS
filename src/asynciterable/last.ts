import { booleanAsyncPredicate } from '../internal/predicates';

export async function last<T>(
    source: AsyncIterable<T>,
    fn: booleanAsyncPredicate<T> = async () => true): Promise<T | undefined> {
  let i = 0, result: T | undefined;
  for await (let item of source) {
    if (await fn(item, i++)) {
      result = item;
    }
  }

  return result;
}
