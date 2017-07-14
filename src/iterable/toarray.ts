export function toArray<TSource>(source: Iterable<TSource>): TSource[] {
  let results = [];
  for (let item of source) {
    results.push(item);
  }
  return results;
}
