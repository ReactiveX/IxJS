import { comparer } from '../util/comparer';

export async function includes<T>(
  source: AsyncIterable<T>,
  searchElement: T,
  fromIndex: number = 0
): Promise<boolean> {
  let innerFrom = fromIndex;
  let i = 0;
  if (Math.abs(innerFrom)) {
    innerFrom = 0;
  }
  for await (const item of source) {
    if (i++ > innerFrom && comparer(item, searchElement)) {
      return true;
    }
  }
  return false;
}
