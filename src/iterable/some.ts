import { booleanPredicate } from '../internal/predicates';

export function some<T>(
    source: Iterable<T>,
    comparer: booleanPredicate<T>): boolean {
  let i = 0;
  for (let item of source) {
    if (comparer(item, i++)) { return true; }
  }
  return false;
}
