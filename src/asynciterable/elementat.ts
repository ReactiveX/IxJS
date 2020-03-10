import { wrapWithAbort } from './operators/withabort';

export async function elementAt<T>(
  source: AsyncIterable<T>,
  index: number,
  signal?: AbortSignal
): Promise<T | undefined> {
  let i = index;
  for await (const item of wrapWithAbort(source, signal)) {
    if (i === 0) {
      return item;
    }
    i--;
  }
  return undefined;
}
