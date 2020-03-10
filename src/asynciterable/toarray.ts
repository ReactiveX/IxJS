import { wrapWithAbort } from './operators/withabort';

export async function toArray<TSource>(
  source: AsyncIterable<TSource>,
  signal?: AbortSignal
): Promise<TSource[]> {
  const results = [] as TSource[];
  for await (const item of wrapWithAbort(source, signal)) {
    results.push(item);
  }
  return results;
}
