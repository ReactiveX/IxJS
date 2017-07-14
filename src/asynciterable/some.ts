export async function some<T>(
    source: AsyncIterable<T>,
    comparer: (value: T, index: number) => boolean | Promise<boolean>): Promise<boolean> {
  let i = 0;
  for await (let item of source) {
    if (await comparer(item, i++)) { return true; }
  }
  return false;
}
