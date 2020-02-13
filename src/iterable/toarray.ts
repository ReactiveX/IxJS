export function toArray<TSource>(source: Iterable<TSource>): TSource[] {
  const results = [] as TSource[];
  for (const item of source) {
    results.push(item);
  }
  return results;
}
