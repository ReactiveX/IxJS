import { wrapWithAbort } from './operators/withabort';

export async function isEmpty<T>(source: AsyncIterable<T>, signal?: AbortSignal): Promise<boolean> {
  for await (const _ of wrapWithAbort(source, signal)) {
    return false;
  }
  return true;
}
