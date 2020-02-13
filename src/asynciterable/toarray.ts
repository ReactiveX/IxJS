export async function toArray<TSource>(source: AsyncIterable<TSource>): Promise<TSource[]> {
  const results = [] as TSource[];
  for await (const item of source) {
    results.push(item);
  }
  return results;
}
