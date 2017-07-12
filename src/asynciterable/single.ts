export async function single<T>(
    source: AsyncIterable<T>,
    selector: (value: T) => boolean | Promise<boolean> = () => true): Promise<T | undefined> {
  let result: T | undefined;
  let hasResult = false;
  for await (let item of source) {
    if (hasResult && await selector(item)) {
      throw new Error('More than one element was found');
    }
    if (await selector(item)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
