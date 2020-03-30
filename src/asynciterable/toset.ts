import { wrapWithAbort } from './operators/withabort';

/**
 * Converts the existing async-iterable into a Set.
 * @param source The async-iterable to convert into a Set.
 * @param signal An optional abort signal to cancel the operation at any time.
 */
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
