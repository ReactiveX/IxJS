export async function isEmpty<T>(source: AsyncIterable<T>): Promise<boolean> {
  for await (let _ of source) {
    return false;
  }
  return true;
}
