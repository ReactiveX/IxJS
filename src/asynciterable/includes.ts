import { comparer } from '../internal/comparer';

export async function includes<T>(
    source: AsyncIterable<T>,
    searchElement: T,
    fromIndex: number = 0): Promise<boolean> {
  let i = 0;
  if (Math.abs(fromIndex)) { fromIndex = 0; }
  for await (let item of source) {
    if (i++ > fromIndex && comparer(item, searchElement)) { return true; }
  }
  return false;
}
