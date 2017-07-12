export async function toSet<TSource>(source: AsyncIterable<TSource>): Promise<Set<TSource>> {
  let set = new Set<TSource>();
  for await (let item of source) {
    set.add(item);
  }
  return set;
}
