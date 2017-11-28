export function toArray<TSource>(source: Iterable<TSource>): TSource[] {
  let results = [] as TSource[];
  for (let item of source) {
    results.push(item);
  }
  return results;
}
