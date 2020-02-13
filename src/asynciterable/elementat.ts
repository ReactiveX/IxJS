export async function elementAt<T>(
  source: AsyncIterable<T>,
  index: number
): Promise<T | undefined> {
  let idx = index;
  for await (const item of source) {
    if (idx === 0) {
      return item;
    }
    idx--;
  }
  return undefined;
}
