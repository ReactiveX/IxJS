import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

/**
 * Determines whether the given async-iterable is empty.
 * @param source The source async-iterable to determine whether it is empty.
 * @param signal An optional abort signal to cancel the operation.
 */
export async function isEmpty<T>(source: AsyncIterable<T>, signal?: AbortSignal): Promise<boolean> {
  throwIfAborted(signal);
  for await (const _ of wrapWithAbort(source, signal)) {
    return false;
  }
  return true;
}
