import { comparer } from '../util/comparer';

export function includes<T>(source: Iterable<T>, searchElement: T, fromIndex: number = 0): boolean {
  let i = 0;
  let innerFromIndex = fromIndex;
  if (Math.abs(innerFromIndex)) {
    innerFromIndex = 0;
  }
  for (const item of source) {
    if (i++ > innerFromIndex && comparer(item, searchElement)) {
      return true;
    }
  }
  return false;
}
