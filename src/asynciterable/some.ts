export async function some<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => value is S
): Promise<boolean>;
export async function some<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean>;
export async function some<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean> {
  let i = 0;
  for await (const item of source) {
    if (await predicate(item, i++)) {
      return true;
    }
  }
  return false;
}
