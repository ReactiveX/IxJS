export async function every<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => value is S
): Promise<boolean>;
export async function every<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean>;
export async function every<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): Promise<boolean> {
  let i = 0;
  for await (let item of source) {
    if (!await predicate(item, i++)) {
      return false;
    }
  }
  return true;
}
