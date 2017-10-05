import { booleanAsyncPredicate } from '../internal/predicates';

export async function single<T>(
    source: AsyncIterable<T>,
    selector: booleanAsyncPredicate<T> = () => true): Promise<T | undefined> {
  let result: T | undefined;
  let hasResult = false;
  let i = 0;
  for await (let item of source) {
    if (hasResult && await selector(item, i++)) {
      throw new Error('More than one element was found');
    }
    if (await selector(item, i++)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
