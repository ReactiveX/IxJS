import { wrapWithAbort } from './operators/withabort';

export async function toSet<TSource>(
  source: AsyncIterable<TSource>,
  signal?: AbortSignal
): Promise<Set<TSource>> {
  const set = new Set<TSource>();
  for await (const item of wrapWithAbort(source, signal)) {
    set.add(item);
  }
  return set;
}
