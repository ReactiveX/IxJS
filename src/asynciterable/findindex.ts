import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export async function findIndex<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): Promise<number> {
  throwIfAborted(signal);
  let i = 0;

  for await (const item of wrapWithAbort(source, signal)) {
    if (await predicate.call(thisArg, item, i++, signal)) {
      return i;
    }
  }
  return -1;
}
