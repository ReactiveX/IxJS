export async function last<T>(
    source: AsyncIterable<T>,
    fn: (value: T) => boolean | Promise<boolean> = async () => true): Promise<T | undefined> {
  let result: T | undefined;
  for await (let item of source) {
    if (await fn(item)) {
      result = item;
    }
  }

  return result;
}
