export async function toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]> {
  let results = [];
  for await (let item of source) {
    results.push(item);
  }
  return results;
}
