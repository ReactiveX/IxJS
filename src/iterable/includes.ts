import { comparer } from '../internal/comparer';

export function includes<T>(
    source: Iterable<T>,
    searchElement: T,
    fromIndex: number = 0): boolean {
  let i = 0;
  if (Math.abs(fromIndex)) { fromIndex = 0; }
  for (let item of source) {
    if (i++ > fromIndex && comparer(item, searchElement)) { return true; }
  }
  return false;
}
