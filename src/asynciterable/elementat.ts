export async function elementAt<T>(
  source: AsyncIterable<T>,
  index: number
): Promise<T | undefined> {
  let i = index;
  for await (const item of source) {
    if (i === 0) {
      return item;
    }
    i--;
  }
  return undefined;
}
