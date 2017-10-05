import { booleanPredicate } from '../internal/predicates';

export function single<T>(source: Iterable<T>, fn: booleanPredicate<T> = () => true): T | undefined {
  let result: T | undefined;
  let hasResult = false;
  let i = 0;
  for (let item of source) {
    if (hasResult && fn(item, i++)) {
      throw new Error('More than one element was found');
    }
    if (fn(item, i++)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
