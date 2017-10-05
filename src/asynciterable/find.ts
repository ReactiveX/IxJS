import { bindCallback } from '../internal/bindcallback';
import { booleanAsyncPredicate } from '../internal/predicates';

export async function find<T>(
    source: AsyncIterable<T>,
    predicate: booleanAsyncPredicate<T>,
    thisArg?: any): Promise<T | undefined> {
  const fn = bindCallback(predicate, thisArg, 2);
  let i = 0;

  for await (let item of source) {
    if (await fn(item, i++)) {
      return item;
    }
  }
  return undefined;
}
