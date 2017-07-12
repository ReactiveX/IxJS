export async function count<T>(
    source: AsyncIterable<T>,
    fn: (value: T) => boolean | Promise<boolean> = async () => true): Promise<number> {
  let i = 0;

  for await (let item of source) {
    if (await fn(item)) {
      i++;
    }
  }

  return i;
}
