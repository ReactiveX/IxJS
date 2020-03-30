import { wrapWithAbort } from './operators/withabort';

/**
 * Converts an existing async-iterable to an array.
 * @param source The async-iterable to convert to an array.
 * @param signal An optional abort signal to cancel the operation at any time.
 */
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
