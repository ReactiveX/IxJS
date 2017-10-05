import { booleanPredicate } from '../internal/predicates';

export function last<T>(source: Iterable<T>, fn: booleanPredicate<T> = () => true): T | undefined {
  let i = 0, result: T | undefined;
  for (let item of source) {
    if (fn(item, i++)) {
      result = item;
    }
  }

  return result;
}
