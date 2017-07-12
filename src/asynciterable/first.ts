export async function first<T>(
    source: AsyncIterable<T>,
    predicate: (value: T) => boolean | Promise<boolean> = async () => true): Promise<T | undefined> {
  for await (let item of source) {
    if (await predicate(item)) {
      return item;
    }
  }

  return undefined;
}
