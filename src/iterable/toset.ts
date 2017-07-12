export function toSet<TSource>(source: Iterable<TSource>): Set<TSource> {
  let set = new Set<TSource>();
  for (let item of source) {
    set.add(item);
  }
  return set;
}
