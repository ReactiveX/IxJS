import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export async function elementAt<T>(
  source: AsyncIterable<T>,
  index: number,
  signal?: AbortSignal
): Promise<T | undefined> {
  throwIfAborted(signal);
  let i = index;
  for await (const item of wrapWithAbort(source, signal)) {
    if (i === 0) {
      return item;
    }
    i--;
  }
  return undefined;
}
