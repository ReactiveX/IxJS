export async function first<T, S extends T>(
  source: AsyncIterable<T>,
  predicate?: (value: T, index: number) => value is S
): Promise<S | undefined>;
export async function first<T>(
  source: AsyncIterable<T>,
  predicate?: (value: T, index: number) => boolean | Promise<boolean>
): Promise<T | undefined>;
export async function first<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean> = async () => true
): Promise<T | undefined> {
  let i = 0;
  for await (let item of source) {
    if (await predicate(item, i++)) {
      return item;
    }
  }

  return undefined;
}
