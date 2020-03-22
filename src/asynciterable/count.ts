import { AbortSignal } from '../abortsignal';
import { wrapWithAbort } from './operators/withabort';

export async function count<T>(
  source: AsyncIterable<T>,
  fn: (value: T, signal?: AbortSignal) => boolean | Promise<boolean> = async () => true,
  signal?: AbortSignal
): Promise<number> {
  let i = 0;

  for await (const item of wrapWithAbort(source, signal)) {
    if (await fn(item, signal)) {
      i++;
    }
  }

  return i;
}
