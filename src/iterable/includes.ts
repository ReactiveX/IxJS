import { comparer } from '../util/comparer';

export function includes<T>(source: Iterable<T>, searchElement: T, fromIndex: number = 0): boolean {
  let fromIdx = fromIndex;
  let i = 0;
  if (Math.abs(fromIdx)) {
    fromIdx = 0;
  }
  for (const item of source) {
    if (i++ > fromIdx && comparer(item, searchElement)) {
      return true;
    }
  }
  return false;
}
