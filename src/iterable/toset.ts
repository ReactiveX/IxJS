export function toSet<TSource>(source: Iterable<TSource>): Set<TSource> {
  const set = new Set<TSource>();
  for (const item of source) {
    set.add(item);
  }
  return set;
}
