export async function elementAt<T>(source: AsyncIterable<T>, index: number): Promise<T | undefined> {
  for await (let item of source) {
    if (index === 0) { return item; }
    index--;
  }
  return undefined;
}
