export async function single<T, S extends T>(
  source: AsyncIterable<T>,
  predicate?: (value: T, index: number) => value is S
): Promise<S | undefined>;
export async function single<T>(
  source: AsyncIterable<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined>;
export async function single<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean> = () => true
): Promise<T | undefined> {
  let result: T | undefined;
  let hasResult = false;
  let i = 0;
  for await (let item of source) {
    if (hasResult && (await predicate(item, i++))) {
      throw new Error('More than one element was found');
    }
    if (await predicate(item, i++)) {
      result = item;
      hasResult = true;
    }
  }

  return result;
}
